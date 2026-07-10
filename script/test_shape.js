let shapes = new Map()

function onTickEvent() {
    const list = getEntityList()

    // 记录本帧存在的实体
    const alive = new Set(list)

    // ====== 删除已经不存在的实体 ======
    for (const [entity, id] of shapes) {
        if (!alive.has(entity)) {
            removeShape(id)
            shapes.delete(entity)
        }
    }

    // ====== 更新 / 创建 ======
    for (let entity of list) {

        const pos = getEntityPos(entity)
        const size = getEntitySize(entity)

        if (pos === undefined || size === undefined) {
            continue
        }

        let id

        if (!shapes.has(entity)) {
            id = createShape({
                type: "box"
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

            shapes.set(entity, id)

        } else {
            id = shapes.get(entity)

            updateShape(id, {
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
        }
    }
}
