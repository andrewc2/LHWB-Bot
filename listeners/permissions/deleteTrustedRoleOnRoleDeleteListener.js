const { Listener } = require("discord-akairo");
const { db } = require("../../models/db");

module.exports = class DeleteTrustedRoleOnRoleDeleteListener extends Listener {
	constructor() {
		super("deleteTrustedRoleOnRoleDelete", {
			event: "roleDelete",
			emitter: "client",
			category: "permissions",
		});
	}

	exec(role) {
		db.query("DELETE FROM permissions WHERE role_id = ?", [role.id]);
	}
};
