import {
	INodeTypeDescription,
} from 'n8n-workflow';

export const dagenoApiDescription: INodeTypeDescription = {
	displayName: 'Dageno API',
	name: 'dagenoApi',
	icon: 'file:dageno.svg',
	group: ['transform'],
	version: 1,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Consume Dageno API',
	defaults: {
		name: 'Dageno API',
	},
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'dagenoApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Brand',
					value: 'brand',
				},
				{
					name: 'GEO Analysis',
					value: 'geoAnalysis',
				},
				{
					name: 'Opportunities',
					value: 'opportunities',
				},
				{
					name: 'Topics',
					value: 'topics',
				},
				{
					name: 'Prompts',
					value: 'prompts',
				},
				{
					name: 'Citations',
					value: 'citations',
				},
			],
			default: 'brand',
		},
		// Operations for Brand
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'brand',
					],
				},
			},
			options: [
				{
					name: 'Get',
					value: 'get',
					description: 'Get brand base information',
					action: 'Get brand information',
				},
			],
			default: 'get',
		},
		// Operations for GEO Analysis
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'geoAnalysis',
					],
				},
			},
			options: [
				{
					name: 'Execute',
					value: 'execute',
					description: 'Execute GEO analysis query',
					action: 'Execute GEO analysis',
				},
			],
			default: 'execute',
		},
		{
			displayName: 'Body (JSON)',
			name: 'body',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: [
						'geoAnalysis',
					],
					operation: [
						'execute',
					],
				},
			},
			default: '{}',
			description: 'The JSON body to send for GEO analysis',
		},
		// Operations for Opportunities
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'opportunities',
					],
				},
			},
			options: [
				{
					name: 'List',
					value: 'list',
					description: 'List opportunities',
					action: 'List opportunities',
				},
			],
			default: 'list',
		},
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			displayOptions: {
				show: {
					resource: [
						'opportunities',
					],
				},
			},
			options: [
				{
					name: 'Content',
					value: 'content',
				},
				{
					name: 'Backlink',
					value: 'backlink',
				},
				{
					name: 'Community',
					value: 'community',
				},
			],
			default: 'content',
		},
		// Operations for Topics
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'topics',
					],
				},
			},
			options: [
				{
					name: 'List',
					value: 'list',
					description: 'List topics',
					action: 'List topics',
				},
			],
			default: 'list',
		},
		// Operations for Prompts
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'prompts',
					],
				},
			},
			options: [
				{
					name: 'List',
					value: 'list',
					description: 'List prompts',
					action: 'List prompts',
				},
				{
					name: 'List Responses',
					value: 'listResponses',
					description: 'List responses by prompt',
					action: 'List prompt responses',
				},
				{
					name: 'Get Response Detail',
					value: 'getResponseDetail',
					description: 'Get response detail by prompt',
					action: 'Get prompt response detail',
				},
			],
			default: 'list',
		},
		{
			displayName: 'Prompt ID',
			name: 'promptId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: [
						'prompts',
					],
					operation: [
						'listResponses',
						'getResponseDetail',
					],
				},
			},
			default: '',
		},
		{
			displayName: 'Response ID',
			name: 'responseId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: [
						'prompts',
					],
					operation: [
						'getResponseDetail',
					],
				},
			},
			default: '',
		},
		// Operations for Citations
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'citations',
					],
				},
			},
			options: [
				{
					name: 'List Domains',
					value: 'listDomains',
					description: 'List citation domains',
					action: 'List citation domains',
				},
				{
					name: 'List URLs',
					value: 'listUrls',
					description: 'List citation URLs',
					action: 'List citation URLs',
				},
			],
			default: 'listDomains',
		},
	],
};
