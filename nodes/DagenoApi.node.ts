import {
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

import {
	dagenoApiDescription,
} from './DagenoApi.description';

export class DagenoApi implements INodeType {
	description: INodeTypeDescription = dagenoApiDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('dagenoApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;
				const headers = {
					'x-api-key': credentials.apiKey as string,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				};

				let method: IHttpRequestMethods = 'GET';
				let url = 'https://api.dageno.ai/business/api/v1/open-api';
				let body: IDataObject | undefined;
				const qs: IDataObject = {};

				// Helper to add pagination and filters to query string for list endpoints
				const addListParams = () => {
					qs.page = this.getNodeParameter('page', i) as number;
					qs.pageSize = this.getNodeParameter('pageSize', i) as number;
					qs.startAt = this.getNodeParameter('startAt', i) as string;
					qs.endAt = this.getNodeParameter('endAt', i) as string;
				};

				if (resource === 'brand') {
					url += '/brand';
				} else if (resource === 'geoAnalysis') {
					method = 'POST';
					url += '/geo/analysis';
					const bodyInput = this.getNodeParameter('body', i) as any;
					if (typeof bodyInput === 'string') {
						try {
							body = JSON.parse(bodyInput);
						} catch (e) {
							throw new Error('Invalid JSON format in Body parameter. Please provide a valid JSON object.');
						}
					} else {
						body = bodyInput;
					}
				} else if (resource === 'opportunities') {
					url += `/opportunities/${operation}`;
					addListParams();
				} else if (resource === 'topics') {
					url += '/topics';
					addListParams();
				} else if (resource === 'prompts') {
					if (operation === 'list') {
						url += '/prompts';
						addListParams();
					} else if (operation === 'listResponses') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/prompts/${promptId}/responses`;
						addListParams();
					} else if (operation === 'getResponseDetail') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const responseId = this.getNodeParameter('responseId', i) as string;
						url += `/prompts/${promptId}/responses/${responseId}`;
					}
				} else if (resource === 'citations') {
					if (operation === 'listDomains') {
						url += '/citations/domains';
						addListParams();
					} else if (operation === 'listUrls') {
						url += '/citations/urls';
						addListParams();
					} else if (operation === 'listDomainsByPrompt') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/citations/domains`;
						qs.promptId = promptId;
						addListParams();
					} else if (operation === 'listUrlsByPrompt') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/citations/urls`;
						qs.promptId = promptId;
						addListParams();
					}
				}

				const options = {
					method,
					url,
					headers,
					qs,
					body,
					json: true,
				};

				try {
					responseData = await this.helpers.httpRequest(options);
				} catch (error) {
					if (error.response && error.response.data) {
						const apiError = error.response.data;
						const message = apiError.message || apiError.error || JSON.stringify(apiError);
						throw new Error(`Dageno API Error (${error.response.status}): ${message}`);
					}
					throw error;
				}

				if (responseData.error) {
					throw new Error(`Dageno API Error: ${responseData.message || 'Unknown Error'}`);
				}

				const data = responseData.data || responseData;

				if (Array.isArray(data)) {
					for (const entry of data) {
						returnData.push({ json: entry as IDataObject });
					}
				} else if (data.items && Array.isArray(data.items)) {
					for (const entry of data.items) {
						returnData.push({ json: entry as IDataObject });
					}
				} else {
					returnData.push({ json: data as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
