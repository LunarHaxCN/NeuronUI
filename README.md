# NeuronUI Homura

> 面向 Minecraft 基岩版实用客户端的轻量、可定制 UI 资源包。

[项目说明](Docs/README_zh.md) · [更新日志](Docs/UpdateLog_zh.md) · [Release 索引](Docs/ReleaseIndex.md)

**当前适配模板：** `7.11.3`　·　**版本代号：** `Homura`

## 面板导航

| 面板 | 文件 | 用途 |
|------|------|------|
| Main | `ui/Neuron_main.json` | 入口与分类导航 |
| Combat | `ui/Neuron_combat.json` | KillAura、自瞄、击中范围、抗击退 |
| Player | `ui/Neuron_player.json` | 玩家能力、自动化与编辑器 |
| Movement | `ui/Neuron_movement.json` | 踏空、冲刺、搭路、骑乘 |
| Render | `ui/Neuron_render.json` | ESP、视角、追踪、方块视图、HUD |
| Settings | `ui/Neuron_settings.json` | 水印、清理、RN 控制、配置 |
| Loophole | `ui/Neuron_loophole.json` | 崩溃测试、NBT、服务器商店 |
| Network | `ui/Neuron_network.json` | 数据包重复、停止、放行、管理 |
| Auxiliary | `ui/Neuron_auxiliary.json` | 建造辅助、音频、假名等 |
| Super | `ui/Neuron_super.json` | 定制版功能与宠物背包 |
| About | `ui/Neuron_about.json` | 项目引用与致谢 |
| Debug | `ui/Neuron_Debug.json` | Python 执行器与诊断 |

功能不拆分为 `World` 或 `Dev` 面板，而是放入最符合使用场景的既有分类。

## 安装使用

1. 将仓库内容复制到客户端 UI/资源包目录。

## 目录结构

```text
NeuronUI/
├── ui/              JSON 面板与配置定义
├── script/          JavaScript 运行模块
├── textures/        快捷键图标（close/open/other）
├── py/              Python 工具
├── plugins/         Java 插件框架
├── redirect/        资源重定向配置
├── resource_packs/  资源包重定向
├── sound_manager/   音频管理器
├── sounds/          音频文件
├── nbt/             NBT 示例
└── Docs/            项目文档与更新记录
```

## 开发约定

面板使用 `Neuron_*.json` 命名，数据文件使用 `conf_*.json`；公共定义位于 `ui/ui_definition.json` 与 `ui/ui_variables.json`。新增功能时，请放入合适的既有面板并在进入游戏前完成 JSON 校验。

## 相关链接

- [GitHub 仓库](https://github.com/Prejudice-Studio/NeuronUI)
- [中文文档](Docs/README_zh.md)
