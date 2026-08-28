/**
 * @author: WhiteWallTeam
 * @date: 2026.6.30
 * @description: ImGui 控制面板
 */

const gui = require('ImGui');

const showDemo = new gui.AccessValue(false);
const inputValue = new gui.AccessValue('');
const floatValue = new gui.AccessValue(0.0, 'float');
const intValue = new gui.AccessValue(0);
const colorValue = new gui.Tuple(0.5, 0.5, 0.5, 1.0);
const comboIndex = new gui.AccessValue(0);

function onImGuiRenderEvent() {
    gui.Begin("控制面板");

    if (gui.Checkbox("显示 Demo 窗口", showDemo)) {
        console.log("是否显示 Demo:", showDemo.value);
    }

    if (gui.InputText("输入值", inputValue)) {
        console.log("输入值:", inputValue.value);
    }

    if (gui.SliderFloat("浮点数", floatValue, 0.0, 1.0)) {
        console.log("浮点数:", floatValue.value);
    }
    if (gui.SliderInt("整数", intValue, 0, 100)) {
        console.log("整数:", intValue.value);
    }

    if (gui.Button("Click Me")) {
        console.log("Clicked!");
    }

    // Color Picker
    if (gui.ColorEdit("Color", colorValue)) {
        console.log("Color:", colorValue.value);
    }

    if (gui.Combo("Options", comboIndex, ["Item 1", "Item 2", "Item 3"])) {
        console.log("Combo Index:", comboIndex.value);
    }

    // 让下一个控件与前一个控件在同一行显示
    gui.Button("Button 1");
    gui.SameLine();
    gui.Button("Button 2");
    gui.SameLine();
    gui.Button("Button 3")

    if (gui.BeginTabBar("MyTabs")) {
        if (gui.BeginTabItem("Tab A")) {
            gui.Text("This is Tab A");
            gui.EndTabItem();
        }
        if (gui.BeginTabItem("Tab B")) {
            gui.Text("This is Tab B");
            gui.EndTabItem();
        }
        gui.EndTabBar();
    }
    gui.End();

    // 可选显示 ImGui 自带的 demo 窗口
    if (showDemo.value) {
        gui.ShowDemoWindow();
    }

    //gui.ShowStyleSelector('Style Selector');

    const drawList = gui.GetBackgroundDrawList();

    const color = gui.GetColorU32FromVec4(colorValue);

    drawList.AddLine({x: 100, y: 100}, {x: 200, y: 200}, color);
}
