module.exports = (client) => {

  const getChannelByName = (name, type) => {
    console.log("Getting channel " + name);
    let channels = client.channels.array();
    for(let i = 0; i < channels.length; i++){
      let channelName = channels[i].name;
      if(name === channelName){
        if(type && type === channels[i].type){
          console.log("Channel " + name + " of type " + type + " found!");
          return channels[i];
        }
        else if(!type){
          console.log("Channel " + name + " found!");
          return channels[i];
        }
      }
    }
    console.log("Channel " + name + " was not found");
    return null;
  }

  const getChannelById = (id) => {
    return client.channels.get(id);
  }

  const getDMChannel = (username, cb) => {
    let users = client.users.array();
    for(let i = 0; i < users.length; i++){
      let name = users[i].username;
      if(name === username){
        users[i].createDM().then(dmChannel => {
          cb(dmChannel)
        }).catch(error => {
          console.log(error);
          cb(null);
        });
        return;
      }
    }
    cb(null);
  }

  const channelRetrieverModule = {
      getChannelByName: getChannelByName,
      getChannelById: getChannelById,
      getDMChannel: getDMChannel
  };

  return channelRetrieverModule;
}
