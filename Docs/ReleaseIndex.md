# NeuronUI Release 索引

本文件是 GitHub Releases 与历史标签的统一索引。项目版本始终使用英文代号；所适配的客户端版本仅作为兼容性信息记录。

## 正式版本

| 日期 | 版本代号 | 适配客户端 | GitHub Release |
|------|----------|------------|----------------|
| 2026.8.28 | Homura | 7.11.3 | [Homura](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Homura) |
| 2026.7.10 | Amore | 7.10.3 | [Amore](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Amore) |
| 2025.7.16 | Methadone | 7.5.2 | [Methadone](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Methadone) |
| 2025.3.3 | Kort | 7.4.1 | [Kort](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Kort) |
| 2025.2.22 | Ceirseacha | 7.3.9 | [Ceirseacha](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Ceirseacha) |
| 2025.2.12 | Fuaime | 7.3.7 | [Fuaime](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Fuaime) |
| 2025.2.2 | Lydform | 7.3.6 | [Lydform](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Lydform) |
| 2024.12.17 | Andromeda | 7.2.6 | [Andromeda](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Andromeda) |
| 2024.11.24 | Material | 7.2.2 | [Material](https://github.com/Prejudice-Studio/NeuronUI/releases/tag/Material) |

更早版本的详细记录保留在 [中文更新日志](UpdateLog_zh.md) 中。

## 历史维护标签

- `Lydform-fix` 是 Lydform 的修复发行，保留原标签与下载链接以避免破坏历史引用。
- `Helloween`、`Helloween-fix`、`release` 与 `Fix` 是早期仓库标签（不是 GitHub Release），不再作为正式版本入口。
- Material 与 Andromeda 的标签历史上指向同一提交，自动生成的 Source code 无法准确还原 Material；Material 页面应使用独立上传的 `NeuronUI-Material.zip`。

## 后续发布规则

1. 先更新 `version.json` 中的客户端兼容信息。
2. 使用新的英文单词作为版本代号，并同步 README 与中文更新日志。
3. 标签名、GitHub Release 名和压缩包名统一使用同一代号，例如 `Homura`、`NeuronUI Homura`、`NeuronUI-Homura.zip`。
4. Release 正文包含发布日期、适配客户端、主要变更及完整更新日志链接。
5. 修复内容优先补充在当前版本中；仅在需要重新分发资源包时创建 `<Codename>-fix` 维护发行。
