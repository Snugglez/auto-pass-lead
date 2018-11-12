module.exports = function autoleadpass(d) {
let enabled = true,
	serverId = null,
	playerId = null

d.command.add("passlead", {
$default() {
enabled = !enabled
d.command.message(`[${enabled ? 'enabled' : 'disabled'}].`)
}
})

d.hook('S_PARTY_MEMBER_LIST', 7, (e) => {
if (enabled) {
randomNum = Math.floor(Math.random() * e.members.length)

if (e.members[randomNum].playerId == d.game.me.playerId && e.members[randomNum].serverId == d.game.me.serverId || !e.members[randomNum].online) {
randomNum = Math.floor(Math.random() * e.members.length)
}

serverId = e.members[randomNum].serverId
playerId = e.members[randomNum].playerId

if (e.leaderPlayerId == d.game.me.playerId && e.leaderServerId == d.game.me.serverId) {
d.send('C_CHANGE_PARTY_MANAGER', 2, {
serverId: serverId,
playerId: playerId
})
}
}
})

d.hook('S_CHANGE_PARTY_MANAGER', 2, (e) => {
if (e.playerId == d.game.me.playerId && e.serverId == d.game.me.serverId) {
d.send('C_CHANGE_PARTY_MANAGER', 2, {
serverId: serverId,
playerId: playerId
})
}
})

}