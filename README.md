<!-- DAGENO_AGENT_NAV_START -->

**Dageno Agent Project Map / Dageno Agent 项目导航**

If this repo is useful, you may also want the adjacent Dageno Agent projects for GEO, SEO, AI visibility, and content operations.
如果这个仓库对你有帮助，也可以看看这些相邻的 Dageno Agent 项目，用于 GEO、SEO、AI 可见性和内容增长工作流。

| Stage / 阶段 | Project / 项目 | Use it for / 用途 |
| --- | --- | --- |
| Diagnose / 诊断 | [seo-geo-audit](https://github.com/dageno-agents/seo-geo-audit) | SEO + GEO audit workflows for brands and agencies / 面向品牌和服务商的 SEO + GEO 诊断工作流 |
| Topic + prompt generation / Topic + Prompt 生成 | [dageno-online-topic-prompt-generator](https://github.com/dageno-agents/dageno-online-topic-prompt-generator) | Generate Dageno-ready Topic clusters and high-intent monitoring prompts from a real domain / 基于真实网站生成可导入 Dageno 的 Topic 集群和高意图监控 Prompt |
| Content workflows / 内容生产 | [seo-geo-content-engine](https://github.com/dageno-agents/seo-geo-content-engine) | Full SEO/GEO content workflows / 完整 SEO/GEO 内容工作流 |
| Fanout writing / Fanout 写作 | [geo-content-writer](https://github.com/dageno-agents/geo-content-writer) | Turn Dageno fanout into briefs, drafts, and review contracts / 把 Dageno fanout 变成 brief、draft 和 review contract |
| Organic intelligence / 自然增长分析 | [organic-content-intelligence](https://github.com/dageno-agents/organic-content-intelligence) | Search demand, page funnels, intent coverage, and GEO visibility / 搜索需求、页面漏斗、意图覆盖和 GEO 可见性分析 |
| Site architecture / 站点架构 | [geo-site-architecture-audit](https://github.com/dageno-agents/geo-site-architecture-audit) | Audit site structure and turn it into GEO-ready content recommendations / 诊断网站结构并输出 GEO 内容与内链建议 |
| Brand AI performance / 品牌 AI 表现 | [brand-ai-performance-check](https://github.com/dageno-agents/brand-ai-performance-check) | Dense brand diagnostic reports from Dageno API or custom input / 基于 Dageno API 或自定义数据生成品牌 AI 诊断报告 |
| Automation / 自动化 | [n8n-nodes-dageno](https://github.com/dageno-agents/n8n-nodes-dageno) | Dageno API node for n8n automation / 用于 n8n 自动化的 Dageno API 节点 |
| API + MCP playbook / API 与 MCP | [dageno-mcp-growth-playbook](https://github.com/dageno-agents/dageno-mcp-growth-playbook) | GEO reporting, prompt gaps, citation intelligence, and growth execution / GEO 报告、Prompt Gap、引用分析和增长执行手册 |

More projects / 更多项目: [geo-visual-content-engine](https://github.com/dageno-agents/geo-visual-content-engine), [seo-outreach-skill](https://github.com/dageno-agents/seo-outreach-skill), [geo-pre-sale-report-private](https://github.com/dageno-agents/geo-pre-sale-report-private), [GEO-SEO](https://github.com/dageno-agents/GEO-SEO).

Explore all repos / 查看全部项目: [github.com/dageno-agents](https://github.com/dageno-agents) · Product / 产品: [Dageno](https://dageno.ai/?utm_source=github&utm_medium=social&utm_campaign=official)

<!-- DAGENO_AGENT_NAV_END -->

# n8n-nodes-dageno-ai

This is an n8n community node to interact with the [Dageno Open API](https://open-api-docs.dageno.ai/).

[Dageno](https://dageno.ai/) is a GEO (Generative Engine Optimization) analysis tool that helps you understand how AI search engines perceive your brand and identify opportunities for optimization.

## Features

- **Brand**: Get basic information about your brand.
- **GEO Analysis**: Execute complex GEO analysis queries to see how AI engines respond to your brand.
- **Keyword**: Get keyword volume, CPC, competition, and trend data.
- **Opportunities**: Discover content, backlink, and community opportunities.
- **SEO**: Get traffic and ranking data for a domain.
- **Topics & Prompts**: List and manage topics and prompts used in your analysis, including batch prompt operations.
- **Citations**: Track citation domains and URLs across AI search engine responses.

## Installation

To install this node in your n8n instance:

1. Go to **Settings > Community Nodes**.
2. Click **Install a community node**.
3. Enter `n8n-nodes-dageno-ai` as the package name.
4. Click **Install**.

## Release Process

1. Bump `package.json` version to the next published version.
2. Create a matching Git tag in GitHub (for example `v1.2.7`).
3. Publish through the GitHub Actions workflow with npm provenance enabled.

## Credentials

To use this node, you need a Dageno API Key. You can obtain it from your Dageno dashboard.

1. Create a new credential in n8n.
2. Select **Dageno API**.
3. Enter your `x-api-key`.

## Resources & Operations

### Brand
- **Get**: Retrieve basic brand information.

### GEO Analysis
- **Execute**: Run a GEO analysis query by providing a JSON body.

### Keyword
- **Get Keyword Volume**: Retrieve volume, CPC, competition, and trend data for keywords.

### Opportunities
- **List**: Retrieve opportunities for Content, Backlinks, or Community.

### Topics
- **List**: Get a list of all topics.

### Prompts
- **List**: Get a list of all prompts.
- **List Responses**: Get responses for a specific prompt.
- **Get Response Detail**: Get detailed information for a specific response.
- **List Query Fanout**: Get query fanout data for a specific prompt.
- **Batch Create**: Create prompts in bulk.
- **Batch Delete**: Delete prompts in bulk.
- **Batch Get**: Retrieve prompts in bulk.
- **Batch Update**: Update prompts in bulk.

### SEO
- **Get Traffic Data**: Retrieve SEO traffic, rank, country, source, and keyword data for a domain.

### Citations
- **List Domains**: Get a list of citation domains.
- **List URLs**: Get a list of citation URLs.

## License

[MIT](LICENSE)
