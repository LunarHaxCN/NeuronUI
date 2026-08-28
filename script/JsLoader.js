/**
 * NeuronUI JS Loader
 *
 * 兼容 RunAway 新版 JS API（fs/gui/app/thread/runScript），并保留旧版
 * 全局函数作为降级路径。脚本加载不再修改原文件，避免污染资源包。
 */

const fsApi = safeRequire("fs");
const guiApi = safeRequire("gui");
const appApi = safeRequire("app");
const threadApi = safeRequire("thread");

const loaderName = "JsLoader.js";
const resourceRoot = getResourceRoot();
const scriptRoot = joinPath(resourceRoot, "script");
const dataRoot = getDataRoot();
const configFile = joinPath(dataRoot, "neuron_jsloader.json");

let config = {
    mode: "run",
    allowExit: false,
    delay: 0,
    debug: false,
    lastScript: ""
};

let scriptList = [];
let lastScript = "";

function safeRequire(name) {
    try {
        return require(name);
    } catch (_) {
        return null;
    }
}

function joinPath(...parts) {
    return parts
        .filter((part) => typeof part === "string" && part.length > 0)
        .join("/")
        .replace(/\\/g, "/")
        .replace(/([^:])\/+/g, "$1/");
}

function getResourceRoot() {
    if (appApi && typeof appApi.getResource === "function") {
        return appApi.getResource();
    }
    if (typeof getResource === "function") {
        return getResource();
    }
    return ".";
}

function getDataRoot() {
    if (appApi && typeof appApi.getFilesDir === "function") {
        return appApi.getFilesDir();
    }
    return resourceRoot;
}

function readText(file) {
    if (fsApi && typeof fsApi.read === "function") {
        return String(fsApi.read(file, "utf8"));
    }
    if (typeof read_file === "function") {
        return String(read_file(file));
    }
    throw new Error("文件读取 API 不可用");
}

function writeText(file, content) {
    if (fsApi && typeof fsApi.write === "function") {
        fsApi.write(file, content);
        return;
    }
    if (typeof write_file === "function") {
        write_file(file, content);
        return;
    }
    throw new Error("文件写入 API 不可用");
}

function exists(file) {
    if (fsApi && typeof fsApi.exists === "function") {
        return fsApi.exists(file);
    }
    if (typeof file_exists === "function") {
        return file_exists(file);
    }
    return false;
}

function listFiles(directory) {
    if (fsApi && typeof fsApi.list === "function") {
        return fsApi.list(directory);
    }
    if (typeof file_list === "function") {
        return file_list(directory);
    }
    return [];
}

function getFileSize(file) {
    try {
        if (fsApi && typeof fsApi.fileSize === "function") {
            return Number(fsApi.fileSize(file)) / 1024;
        }
        if (typeof read_file === "function") {
            return String(read_file(file)).length / 1024;
        }
    } catch (_) {
        // 文件可能在列表刷新期间被移除，按 0 KB 展示即可。
    }
    return 0;
}

function showMessage(message) {
    if (appApi && typeof appApi.showToast === "function") {
        appApi.showToast(message);
        return;
    }
    if (typeof clientMessage === "function") {
        clientMessage(message);
        return;
    }
    console.log(message);
}

function showForm(json, callback, cancelCallback) {
    if (guiApi && typeof guiApi.addForm === "function") {
        guiApi.addForm(json, callback, cancelCallback);
        return;
    }
    if (typeof addForm === "function") {
        addForm(json, callback);
        return;
    }
    throw new Error("表单 API 不可用");
}

function runLater(callback, delay) {
    if (threadApi && typeof threadApi.runOnNewThread === "function") {
        threadApi.runOnNewThread(() => setTimeout(callback, delay));
        return;
    }
    if (typeof thread === "function") {
        thread(callback, delay);
        return;
    }
    setTimeout(callback, delay);
}

function normalizeValues(values) {
    if (values.length === 1 && Array.isArray(values[0])) {
        return values[0];
    }
    return values;
}

function loadConfig() {
    if (!exists(configFile)) {
        return;
    }
    try {
        const saved = JSON.parse(readText(configFile));
        if (saved && typeof saved === "object") {
            config = Object.assign(config, saved);
        }
    } catch (error) {
        console.warn("[Neuron] JS Loader 配置读取失败", error);
    }
}

function saveConfig() {
    try {
        writeText(configFile, JSON.stringify(config, null, 2));
    } catch (error) {
        console.warn("[Neuron] JS Loader 配置保存失败", error);
    }
}

function loadLastScript() {
    if (typeof getData === "function") {
        return getData("script", "");
    }
    try {
        if (exists(configFile)) {
            const saved = JSON.parse(readText(configFile));
            return saved.lastScript || "";
        }
    } catch (_) {
        // 使用空值即可。
    }
    return "";
}

function saveLastScript(name) {
    lastScript = name;
    config.lastScript = name;
    if (typeof setData === "function") {
        setData("script", name);
        return;
    }
    saveConfig();
}

function refreshScriptList() {
    scriptList = listFiles(scriptRoot)
        .filter((entry) => entry && typeof entry.name === "string")
        .filter((entry) => entry.name.toLowerCase().endsWith(".js"))
        .filter((entry) => entry.name !== loaderName)
        .map((entry) => ({
            name: entry.name,
            path: entry.path || joinPath(scriptRoot, entry.name)
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

function openMainMenu() {
    refreshScriptList();
    if (scriptList.length === 0) {
        showMessage("§b[Neuron]§e 未找到可加载的 JavaScript 脚本");
        return;
    }

    const menu = {
        type: "form",
        title: "§3脚本管理 · 共 " + scriptList.length + " 个",
        content: "选择脚本执行，或进入设置",
        buttons: [
            {text: "§9设置"},
            {text: "§9上次加载：§e" + (lastScript || "无")}
        ]
    };

    for (const script of scriptList) {
        menu.buttons.push({
            text: "§e" + script.name + "§r - §a" + getFileSize(script.path).toFixed(2) + " KB",
            image: {
                type: "path",
                data: "textures/ui/storageIconColor.png"
            }
        });
    }

    showForm(JSON.stringify(menu), (value) => {
        const index = Number(normalizeValues([value])[0]);
        if (index === 0) {
            openSettings();
        } else if (index === 1) {
            if (lastScript) loadScript(lastScript);
            else showMessage("§b[Neuron]§e 尚未加载过脚本");
        } else if (index >= 2 && scriptList[index - 2]) {
            loadScript(scriptList[index - 2].name);
        }
    }, () => {});
}

function openSettings() {
    const form = {
        type: "custom_form",
        title: "§aJS Loader 设置",
        content: [
            {type: "slider", text: "加载延迟 / 秒", min: 0, max: 10, step: 1, default: Math.round(config.delay / 1000)},
            {type: "dropdown", text: "执行模式", options: ["runScript（推荐）", "eval（当前环境）"], default: config.mode === "eval" ? 1 : 0},
            {type: "toggle", text: "启用‘退出’聊天指令", default: Boolean(config.allowExit)},
            {type: "toggle", text: "调试模式", default: Boolean(config.debug)}
        ]
    };

    showForm(JSON.stringify(form), (...rawValues) => {
        const values = normalizeValues(rawValues);
        config.delay = Math.max(0, Number(values[0] || 0) * 1000);
        config.mode = Number(values[1]) === 1 ? "eval" : "run";
        config.allowExit = Boolean(values[2]);
        config.debug = Boolean(values[3]);
        saveConfig();
        openMainMenu();
    }, () => openMainMenu());
}

function runScriptByName(name) {
    if (typeof runScript === "function") {
        // 新版 API 示例使用不带 .js 后缀的脚本名。
        const bareName = name.replace(/\.js$/i, "");
        try {
            runScript(bareName);
        } catch (error) {
            // 部分过渡版本仍要求带扩展名，自动回退一次。
            if (bareName === name) throw error;
            runScript(name);
        }
        return;
    }
    if (typeof loadScript === "function") {
        loadScript(name);
        return;
    }
    throw new Error("runScript API 不可用");
}

function evaluateScript(name) {
    const script = scriptList.find((item) => item.name === name);
    if (!script) throw new Error("脚本不存在：" + name);
    const source = readText(script.path);
    eval(source);
}

function loadScript(name) {
    if (!name) return;
    showMessage("§b[Neuron]§e 正在加载：§b" + name);
    runLater(() => {
        try {
            if (config.mode === "eval") evaluateScript(name);
            else runScriptByName(name);
            saveLastScript(name);
            showMessage("§b[Neuron]§e 加载完成：§b" + name);
        } catch (error) {
            const message = error && error.stack ? error.stack : String(error);
            if (config.debug) console.error("[Neuron] JS Loader", message);
            showMessage("§b[Neuron]§c 加载失败：" + message);
        }
    }, config.delay);
}

function onSendChatMessageEvent(text) {
    if (config.allowExit && text === "退出") {
        showMessage("§b[Neuron]§e 已退出当前脚本");
        if (typeof exit === "function") exit();
        return true;
    }
    return false;
}

loadConfig();
lastScript = loadLastScript();
openMainMenu();
