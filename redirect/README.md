# redirect.json

用于配置资源重定向规则。

> **注意：**
> 资源重定向会增加文件查找和加载开销，可能对性能产生一定影响，因此**不建议频繁使用或在大量资源项目中启用
**。

## 字段说明

### enable

是否启用资源重定向功能。

**类型：** Boolean

**可选值：**

| 值     | 说明      |
|-------|---------|
| true  | 启用资源重定向 |
| false | 禁用资源重定向 |

**示例：**

```json
{
  "enable": true
}
```

### directory_prefix

资源重定向扫描目录列表。

启用重定向后，系统将根据配置的目录前缀查找对应资源，并将资源路径重定向到指定目录。

**类型：** Array<String>

**默认值：**

```json
[
  "resource_packs/",
  "behavior_packs/",
  "skin_packs/",
  "shaders/",
  "gui/"
]
```

**目录说明：**

| 目录              | 说明     |
|-----------------|--------|
| resource_packs/ | 资源包目录  |
| behavior_packs/ | 行为包目录  |
| skin_packs/     | 皮肤包目录  |
| shaders/        | 着色器目录  |
| gui/            | 界面资源目录 |

## 完整示例

```json
{
  "enable": false,
  "directory_prefix": [
    "resource_packs/",
    "behavior_packs/",
    "skin_packs/",
    "shaders/",
    "gui/"
  ]
}
```

## 工作机制

当 `enable` 为 `true` 时，系统会根据 `directory_prefix` 中配置的目录前缀进行资源路径匹配，并尝试将资源请求重定向到对应目录。

由于每次资源访问都可能触发额外的路径检查，因此会产生一定的性能开销。若无特殊需求，建议保持关闭状态。
