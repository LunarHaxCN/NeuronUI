# NeuronUI

一个适配 Minecraft 基岩版实用客户端的轻量可定制 UI。

**版本：** `Amore`

[English](../README.md) · [更新日志](UpdateLog_zh.md) · [Changelog](UpdateLog_en.md)

---

## 面板列表

| 面板 | 文件 | 说明 |
|------|------|------|
| 主菜单 | `Neuron_main.json` | 导航至各分类面板 |
| 战斗 | `Neuron_combat.json` | KillAura、自瞄、击中范围、抗击退等 |
| 移动 | `Neuron_movement.json` | 踏空、冲刺、自动搭路、水上行走等 |
| 玩家 | `Neuron_player.json` | 能力、游戏模式、自动吃/挖/点击等 |
| 渲染 | `Neuron_render.json` | ESP、追踪、方块透视/轮廓、HUD等 |
| 网络 | `Neuron_network.json` | 数据包重复/停止/放行/管理 |
| 辅助 | `Neuron_auxiliary.json` | 快速建造、连锁挖掘、音频、假名等 |
| 设置 | `Neuron_settings.json` | 水印、数据清理、RN控制、配置保存 |
| 漏洞 | `Neuron_loophole.json` | 崩溃服务器、NBT编辑、商店 |
| 关于 | `Neuron_about.json` | 开源项目引用 |
| 调试 | `Neuron_Debug.json` | Python执行器 |

## 目录结构

```
NeuronUI/
├── ui/             面板定义 (JSON)
├── script/         JavaScript 脚本
├── textures/       快捷键图标
│   ├── close/      Off 状态图标
│   ├── open/       On 状态图标
│   └── other/      功能按钮图标
├── py/             Python 脚本
├── plugins/        Java 插件框架
├── redirect/       资源重定向配置
├── resource_packs/ 资源包重定向
├── sound_manager/  音频管理器
├── sounds/         音频文件
├── nbt/            NBT 示例文件
├── bin/            二进制测试文件
└── Docs/           文档
```

## 资源

- [GitHub](https://github.com/Prejudice-Studio/NeuronUI)
