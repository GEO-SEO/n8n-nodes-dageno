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

				if (resource === 'brand') {
					url += '/brand';
				} else if (resource === 'geoAnalysis') {
					method = 'POST';
					url += '/geo/analysis';
					let bodyInput = this.getNodeParameter('body', i) as any;
					if (typeof bodyInput === 'string') {
						try {
							body = JSON.parse(bodyInput);
						} catch (e) {
							throw new Error('Invalid JSON format in Body parameter.');
						}
					} else {
						body = bodyInput;
					}
				} else if (resource === 'opportunities') {
					url += `/opportunities/${operation}`;
				} else if (resource === 'topics') {
					url += '/topics';
				} else if (resource === 'prompts') {
					if (operation === 'list') {
						url += '/prompts';
					} else if (operation === 'listResponses') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/prompts/${promptId}/responses`;
					} else if (operation === 'getResponseDetail') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const responseId = this.getNodeParameter('responseId', i) as string;
						url += `/prompts/${promptId}/responses/${responseId}`;
					}
				} else if (resource === 'citations') {
					if (operation === 'listDomains') {
						url += '/citations/domains';
					} else if (operation === 'listUrls') {
						url += '/citations/urls';
					} else if (operation === 'listDomainsByPrompt') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/citations/domains?promptId=${promptId}`;
					} else if (operation === 'listUrlsByPrompt') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/citations/urls?promptId=${promptId}`;
					}
				}

				const options = {
					method,
					url,
					headers,
					body,
					json: true,
				};

				responseData = await this.helpers.httpRequest(options);

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
