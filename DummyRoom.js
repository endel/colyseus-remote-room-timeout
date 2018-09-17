const colyseus = require('colyseus');

module.exports = class DummyRoom extends colyseus.Room {
    async onAuth () {
        await (new Promise((resolve, reject) => setTimeout(resolve, 200)));
        return true;
    }

    onInit (options) {
        console.log("DummyRoom created!", options);
        this.setPatchRate(null); // disable automatic patches
    }

    onJoin (client) {
        console.log(`${ client.sessionId } joined.`);
    }

    async onLeave (client) {
        await (new Promise((resolve, reject) => setTimeout(resolve, 200)));

        console.log(`${ client.sessionId } left.`);
    }

    onMessage (client, data) {
        console.log("DummyRoom received message from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose DummyRoom");
    }

}

