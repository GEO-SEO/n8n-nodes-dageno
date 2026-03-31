import {
	INodeTypeDescription,
} from 'n8n-workflow';

export const dagenoApiDescription: INodeTypeDescription = {
	displayName: 'Dageno API',
	name: 'dagenoApi',
	icon: 'file:dageno.svg',
	group: ['transform'],
	version: 1,
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with Dageno API for GEO analysis and insights',
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
		// Operations
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['brand'],
				},
			},
			options: [
				{
					name: 'Get Brand Info',
					value: 'get',
					action: 'Get brand base information',
				},
			],
			default: 'get',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['geoAnalysis'],
				},
			},
			options: [
				{
					name: 'Execute Query',
					value: 'execute',
					action: 'Execute GEO analysis query',
				},
			],
			default: 'execute',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['opportunities'],
				},
			},
			options: [
				{
					name: 'List Content Opportunities',
					value: 'content',
					action: 'List content opportunities',
				},
				{
					name: 'List Backlink Opportunities',
					value: 'backlink',
					action: 'List backlink opportunities',
				},
				{
					name: 'List Community Opportunities',
					value: 'community',
					action: 'List community opportunities',
				},
			],
			default: 'content',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['topics'],
				},
			},
			options: [
				{
					name: 'List Topics',
					value: 'list',
					action: 'List topics',
				},
			],
			default: 'list',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['prompts'],
				},
			},
			options: [
				{
					name: 'List Prompts',
					value: 'list',
					action: 'List prompts',
				},
				{
					name: 'List Responses',
					value: 'listResponses',
					action: 'List responses by prompt',
				},
				{
					name: 'Get Response Detail',
					value: 'getResponseDetail',
					action: 'Get response detail by prompt',
				},
			],
			default: 'list',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['citations'],
				},
			},
			options: [
				{
					name: 'List Domains',
					value: 'listDomains',
					action: 'List citation domains',
				},
				{
					name: 'List URLs',
					value: 'listUrls',
					action: 'List citation URLs',
				},
				{
					name: 'List Domains by Prompt',
					value: 'listDomainsByPrompt',
					action: 'List citation domains by prompt',
				},
				{
					name: 'List URLs by Prompt',
					value: 'listUrlsByPrompt',
					action: 'List citation URLs by prompt',
				},
			],
			default: 'listDomains',
		},
		// Parameters
		{
			displayName: 'Body (JSON)',
			name: 'body',
			type: 'json',
			displayOptions: {
				show: {
					resource: ['geoAnalysis'],
					operation: ['execute'],
				},
			},
			default: '{\n  "target": {\n    "entity": "topic",\n    "metrics": ["visibility", "citation"],\n    "filters": {\n      "dateRange": {\n        "startAt": "2026-03-18T00:00:00.000Z",\n        "endAt": "2026-03-28T00:00:00.000Z"\n      }\n    }\n  },\n  "analysis": {\n    "type": "ranking",\n    "ranking": {\n      "orderBy": "visibility",\n      "direction": "desc"\n    }\n  }\n}',
			required: true,
			description: 'The DSL query body for GEO analysis',
		},
		{
			displayName: 'Prompt ID',
			name: 'promptId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompts', 'citations'],
					operation: ['listResponses', 'getResponseDetail', 'listDomainsByPrompt', 'listUrlsByPrompt'],
				},
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Response ID',
			name: 'responseId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompts'],
					operation: ['getResponseDetail'],
				},
			},
			default: '',
			required: true,
		},
	],
};
