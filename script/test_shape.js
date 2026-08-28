const world = require("world")

let shapes = new Map()

function onTickEvent() {
    const clientWorld = world.getClientWorld();

    const list = clientWorld.getActors();

    // 记录本帧存在的实体
    const alive = new Set();

    for (let entity of list) {
        alive.add(entity.getUniqueID());
    }

    // ====== 删除已经不存在的实体 ======
    for (const [entity, shape] of shapes) {
        if (!alive.has(entity)) {
            shape.remove();
            shapes.delete(entity)
        }
    }

    // ====== 更新 / 创建 ======
    for (let entity of list) {

        const pos = entity.getPos();
        const size = entity.getSize();

        if (pos === undefined || size === undefined) {
            continue
        }

        if (!shapes.has(entity.getUniqueID())) {
            let shape = new world.Shape({
                type: "box",
                visible: true,
                isFill: true,
                lower: {
                    x: pos.x - size.x / 2,
                    y: pos.y,
                    z: pos.z - size.x / 2
                },
                upper: {
                    x: pos.x + size.x / 2,
                    y: pos.y + size.y,
                    z: pos.z + size.x / 2
                },
                color: {r: 1, g: 0, b: 0, a: 1}
            })

            shapes.set(entity, shape)

        } else {
            let shape = shapes.get(entity)
            shape.visible = true;
            shape.isFill = true;
            shape.lower = {
                x: pos.x - size.x / 2,
                y: pos.y,
                z: pos.z - size.x / 2
            };
            shape.upper = {
                x: pos.x + size.x / 2,
                y: pos.y + size.y,
                z: pos.z + size.x / 2
            };
            shape.color = {r: 1, g: 0, b: 0, a: 1};
        }
    }
}
