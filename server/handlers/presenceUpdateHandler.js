const printInfo = (oldMember, newMember) => {
  console.log("---Presence update start---");
  console.log("Old member username: " + oldMember.displayName);
  console.log("New member usesrname: " + newMember.displayName);
  console.log("Old member presence: " + oldMember.presence.status);
  console.log("New member presence: " + newMember.presence.status);
  console.log("---Presesnce update stop---");
}

const handlePresenceUpdate = (oldMember, newMember) => {
  printInfo(oldMember, newMember);
}

module.exports = {
  handlePresenceUpdate: handlePresenceUpdate
};
