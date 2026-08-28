
try {
    const media = require('media');
    console.log('media'.media);
    const system = new media.System();
    console.log('system',system);
    const FMOD_LOOP_NORMAL = 2;
    const sound = system.createSound('/sdcard/Android/data/com.netease.x19/files/resources/sounds/death.ogg', FMOD_LOOP_NORMAL);
    console.log('sound',sound);
    sound.setLoopCount(-1);
    const channel = system.playSound(sound);
    console.log('channel',channel);
} catch (error) {
    console.log(`Error: ${error.message}`);
}