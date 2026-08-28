/**
 * @author: WhiteWallTeam
 * @date: 2025.10.13
 * @description: NBT文件解析
 */

const app = require('app');
const nbt = require('nbt');

const path = app.getResource("bin");

try {
    console.log('load nbt level.dat',nbt.loadVanillaData(path + "/level.dat"));
    console.log('load nbt level.dat',nbt.loadVanillaData(path + "/level.dat",'object'));
    console.log('load nbt test.bdx',nbt.loadBdx(path + "/test.bdx"));
    console.log('load nbt test.litematic',nbt.loadLiteSchematic(path + "/test.litematic"));
    console.log('load nbt test.nbt',nbt.loadSchematic(path + "/test.nbt"));
    console.log('load nbt test.schem',nbt.loadSchematic(path + "/test.schem"));
    console.log('load nbt test.schematic',nbt.loadSchematic(path + "/test.schematic"));
} catch (e) {
    console.log(`load nbt error ${e.message}`);
}