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

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'brand') {
					if (operation === 'get') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/brand',
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					}
				} else if (resource === 'geoAnalysis') {
					if (operation === 'execute') {
						const body = this.getNodeParameter('body', i) as string;
						const options = {
							method: 'POST' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/geo/analysis',
							body: JSON.parse(body),
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					}
				} else if (resource === 'opportunities') {
					const type = this.getNodeParameter('type', i) as string;
					const options = {
						method: 'GET' as IHttpRequestMethods,
						url: `https://api.dageno.ai/business/api/v1/open-api/opportunities/${type}`,
					};
					responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
				} else if (resource === 'topics') {
					if (operation === 'list') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/topics',
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					}
				} else if (resource === 'prompts') {
					if (operation === 'list') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/prompts',
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					} else if (operation === 'listResponses') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: `https://api.dageno.ai/business/api/v1/open-api/prompts/${promptId}/responses`,
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					} else if (operation === 'getResponseDetail') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const responseId = this.getNodeParameter('responseId', i) as string;
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: `https://api.dageno.ai/business/api/v1/open-api/prompts/${promptId}/responses/${responseId}`,
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					}
				} else if (resource === 'citations') {
					if (operation === 'listDomains') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/citations/domains',
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
					} else if (operation === 'listUrls') {
						const options = {
							method: 'GET' as IHttpRequestMethods,
							url: 'https://api.dageno.ai/business/api/v1/open-api/citations/urls',
						};
						responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
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
