/**
 * @author: WhiteWallTeam
 * @date: 2025.10.13
 * @description: NBT文件解析
 */

const path = getResource("bin")

console.log(loadNbtFromFile(path + "/level.dat"))
console.log(loadNbtFromFile(path + "/test.bdx"))
console.log(loadNbtFromFile(path + "/test.litematic"))
console.log(loadNbtFromFile(path + "/test.nbt"))
console.log(loadNbtFromFile(path + "/test.schem"))
console.log(loadNbtFromFile(path + "/test.schematic"))