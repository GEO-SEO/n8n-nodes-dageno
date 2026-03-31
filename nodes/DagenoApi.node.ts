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

		// Explicitly get credentials at the beginning of execution
		const credentials = await this.getCredentials('dagenoApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;
				const headers = {
					'x-api-key': credentials.apiKey as string,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				};

				if (resource === 'brand') {
					if (operation === 'get') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/brand',
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					}
				} else if (resource === 'geoAnalysis') {
					if (operation === 'execute') {
						let body = this.getNodeParameter('body', i) as any;
						
						// Handle potential string vs object input from n8n UI
						if (typeof body === 'string') {
							try {
								body = JSON.parse(body);
							} catch (e) {
								throw new Error('Invalid JSON format in Body parameter.');
							}
						}

						const options = {
							method: 'POST' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/geo/analysis',
							headers,
							body,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					}
				} else if (resource === 'opportunities') {
					const type = this.getNodeParameter('type', i) as string;
					const options = {
						method: 'GET' as IHttpRequestMethods,
						url: `https://api.dageno.ai/business/api/v1/open-api/opportunities/${type}`,
						headers,
						json: true,
					};
					responseData = await this.helpers.httpRequest(options);
				} else if (resource === 'topics') {
					if (operation === 'list') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/topics',
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					}
				} else if (resource === 'prompts') {
					if (operation === 'list') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/prompts',
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					} else if (operation === 'listResponses') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: `https://api.dageno.ai/business/api/v1/open-api/prompts/${promptId}/responses`,
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					} else if (operation === 'getResponseDetail') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const responseId = this.getNodeParameter('responseId', i) as string;
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: `https://api.dageno.ai/business/api/v1/open-api/prompts/${promptId}/responses/${responseId}`,
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					}
				} else if (resource === 'citations') {
					if (operation === 'listDomains') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/citations/domains',
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					} else if (operation === 'listUrls') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/citations/urls',
							headers,
							json: true,
						};
						responseData = await this.helpers.httpRequest(options);
					}
				}

				if (Array.isArray(responseData)) {
					for (const data of responseData) {
						returnData.push({ json: data });
					}
				} else {
					returnData.push({ json: responseData as IDataObject });
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
