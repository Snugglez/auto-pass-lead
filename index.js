module.exports = function autoleadpass(d) {
let enabled = true,
	serverId = null,
	playerId = null,
	members = [],
	randomNum = null

d.command.add("passlead", {
$default() {
enabled = !enabled
d.command.message(`[${enabled ? 'enabled' : 'disabled'}].`)
}
})

d.hook('S_PARTY_MEMBER_LIST', 7, (e) => {
if (enabled) {
members = e.members
randomNum = Math.floor(Math.random() * members.length)

for(let i = 0; i < 50 && (members[randomNum].playerId == d.game.me.playerId && members[randomNum].serverId == d.game.me.serverId || !members[randomNum].online); i++) {
randomNum = Math.floor(Math.random() * members.length);
}

serverId = members[randomNum].serverId
playerId = members[randomNum].playerId

if (e.leaderPlayerId == d.game.me.playerId && e.leaderServerId == d.game.me.serverId) {
setTimeout(function() {
d.send('C_CHANGE_PARTY_MANAGER', 2, {
serverId: serverId,
playerId: playerId
})
}, Math.floor(Math.random() * 1000) + 2000)
}
}
})

d.hook('S_CHANGE_PARTY_MANAGER', 2, (e) => {
if (enabled) {
if (e.playerId == d.game.me.playerId && e.serverId == d.game.me.serverId) {

randomNum = Math.floor(Math.random() * members.length)

for(let i = 0; i < 50 && (members[randomNum].playerId == d.game.me.playerId && members[randomNum].serverId == d.game.me.serverId || !members[randomNum].online); i++) {
randomNum = Math.floor(Math.random() * members.length);
}

serverId = members[randomNum].serverId
playerId = members[randomNum].playerId

setTimeout(function() {
d.send('C_CHANGE_PARTY_MANAGER', 2, {
serverId: serverId,
playerId: playerId
})
}, Math.floor(Math.random() * 1000) + 2000)
}
}
})

}