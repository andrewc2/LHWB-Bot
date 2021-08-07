const { Inhibitor } = require("discord-akairo");

class SendPermissionsInhibit extends Inhibitor {
    constructor() {
        super("sendPermissionsInhibit", {
            reason: "Missing Send Messages Permissions",
            type: "all"
        });
    }

    exec(message, command) {
        if (message.guild) {
            if (!message.guild.me.permissions.has("SEND_MESSAGES")) {
                return true;
            }
        }
    }
}

module.exports = SendPermissionsInhibit