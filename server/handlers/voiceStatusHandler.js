const printInfo = (oldMember, newMember) => {
  console.log("---Voice status update start---");
  console.log("Old member username: " + oldMember.displayName);
  console.log("New member usesrname: " + newMember.displayName);
  console.log("Old member presence: " + oldMember.presence.status);
  console.log("New member presence: " + newMember.presence.status);
  console.log("Old member voice channel: " + (oldMember.voiceChannel ? oldMember.voiceChannel.name : ""));
  console.log("New member voice channel: " + (newMember.voiceChannel ? newMember.voiceChannel.name : ""));
  console.log("---Voice status update end---");
}

const handleStatusUpdate = (oldMember, newMember) => {
  printInfo(oldMember, newMember);
}

module.exports = {
  handleStatusUpdate: handleStatusUpdate
}
