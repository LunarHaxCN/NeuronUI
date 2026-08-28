# NeuronUI - 开发规范

## 项目概述

NeuronUI 是一个 Minecraft 基岩版实用客户端的 UI 资源包，使用 JSON 定义面板和功能开关。

## 关键规范

### 版本命名
- 使用英文单词作为版本代号（如 `Amore`、`Methadone`、`Kort`）
- 不直接使用所适配客户端的版本号

### UI 文件规范 (ui/)

- 面板定义文件使用 `Neuron_*.json` 命名
- 配置/数据文件使用 `conf_*.json` 命名
- 变量定义使用 `$MenuColor`、`$TextColor` 等格式
- 定义文件使用 `ui_definition.json` 和 `ui_variables.json`

### 快捷键图标规范 (textures/)

- 开关类功能：一对 PNG
  - `textures/close/NeuronOff_<Tag>.png` — 关闭状态
  - `textures/open/NeuronOn_<Tag>.png` — 开启状态
  - 建议 65x65 像素
- 按钮类功能：一个 PNG
  - `textures/other/Neuron_<Tag>.png`
- JSON 中引用路径格式：`close/NeuronOff_<Tag>.png`

### 更新日志格式
```
# YYYY.M.D  版本名
- 更新内容
```

### 新增功能步骤
1. 在对应 `Neuron_*.json` 的 `items` 数组中添加条目
2. 绘制快捷键图标放入 `textures/close/` 和 `textures/open/`
3. 在更新日志中添加记录

### 数据包配置 (conf_packet.json)

- 常用数据包放在列表靠前位置，预设 `send`/`receive` 开关
- 其余数据包按 ID 升序排列
