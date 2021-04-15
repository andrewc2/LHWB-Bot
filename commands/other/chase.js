const { Command } = require("discord-akairo");
const { cmdRestrictionsNoVC } = require("../../utilities");

class ChaseCommand extends Command {
    constructor() {
        super("chasegang", {
            aliases: ["chase", "chasegang"],
            category: "other",
            channel: "guild",
            cooldown: 3000,
            ratelimit: 1,
            description: {
                content: "Pings the Chase Gang for a police chase (Limited to reproom role).",
                usage: "chasegang",
                examples: [
                    "chasegang"
                ]
            },
            args: [
                {
                    id: 'mention',
                    type: 'string',
                    match: 'content'
                }
            ]
        });
    }

    userPermissions(message) {
        return cmdRestrictionsNoVC(message)
    }

    exec(message, args) {
       message.channel.send(`chasegang chase <@!450183719332872202> <@!118811246899232770> <@!105861141024002048> <@!310969106599903234> <@!584259031875584001> <@!718619056181215313> <@!119341483219353602> <@!557896350159863820> <@!709821527196958882> <@!126829730136719360> <@!184847961371443200> <@!287381072470343681> <@!217064149207875587> <@!645400586644094992> <@!722134644702838785> <@!147109473155022848> - ask iAndrewC to join`);
    }
}

module.exports = ChaseCommand;