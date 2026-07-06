# n8n-nodes-dageno 中文说明

> 把 Dageno Open API 接进 n8n 自动化流程的 community node。

## 它解决什么问题

- 如果团队已经在 n8n 里做自动化，就不应该每次手写脚本调用 Dageno。
- 这个节点让你在 workflow 里直接调用品牌、GEO 分析、关键词、机会、Topic、Prompt、SEO 和引用数据。

## 什么时候用它

- 你想把 Dageno 数据接到自动报告、监控、告警或内容生产流程里。
- 你熟悉 n8n，希望用可视化 workflow 串联 API。
- 你需要批量管理 Topics 和 Prompts。

## 和相邻项目有什么区别

- 它是“自动化连接器”。
- `dageno-mcp-growth-playbook` 是 API/MCP 的解释和示例。
- 其他内容/审计仓库是业务工作流，不是 n8n node。

## 主要输出

- n8n community node
- Dageno credentials
- Brand/GEO/Keyword/Opportunity/Topic/Prompt/SEO/Citation operations

## 快速开始

1. 在 n8n 的 Community Nodes 里安装 `n8n-nodes-dageno-ai`。
2. 配置 Dageno Open API credentials。
3. 在 workflow 中选择需要的 resource 和 operation。

## 给中文读者的说明

这是当前公开仓库的中文本地化入口。英文 README.md 仍然保留更完整的原始说明、命令细节和历史上下文；中文版本优先帮助国内用户快速理解这个项目是做什么的、什么时候该用、以及它和其他 Dageno Agent 项目的区别。

## License

请参考英文 README 和仓库内的 LICENSE 文件。
