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

  const channelRetrieverModule = {
      getChannelByName: getChannelByName,
      getChannelById: getChannelById
  };

  return channelRetrieverModule;
}
