module.exports = (client) => {

  const getChannelByName = (name) => {
    console.log("Getting channel " + name);
    let channels = client.channels.array();
    for(let i = 0; i < channels.length; i++){
      let channelName = channels[i].name;
      if(name.toLowerCase() === channelName.toLowerCase()){
        return channels[i];
      }
    }
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
