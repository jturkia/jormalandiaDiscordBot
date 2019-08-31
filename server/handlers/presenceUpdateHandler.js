const printInfo = (oldMember, newMember) => {
  console.log("---Presence update start---");
  console.log("Old member username: " + oldMember.displayName);
  console.log("New member username: " + newMember.displayName);
  console.log("Old member presence: " + oldMember.presence.status);
  console.log("New member presence: " + newMember.presence.status);
  console.log("Old member game: " + (oldMember.presence.game ? oldMember.presence.game.name : ""));
  console.log("Old member game details: " + (oldMember.presence.game ? oldMember.presence.game.details : ""));
  console.log("New member game: " + (newMember.presence.game ? newMember.presence.game.name : ""));
  console.log("New member game details: " + (newMember.presence.game ? newMember.presence.game.details : ""));
  console.log("---Presesnce update stop---");
}

const handlePresenceUpdate = (oldMember, newMember) => {
  printInfo(oldMember, newMember);
}

module.exports = {
  handlePresenceUpdate: handlePresenceUpdate
};
