module.exports = (client) => {

  const getChannels = (request, response) => {
    let channels = client.channels.array();
    let respArray = [];
    for(let i = 0; i < channels.length; i++){
      if(channels[i].deleted || channels[i].type === "category") continue;
      let respObj = {
        name: channels[i].name,
        type: channels[i].type,
        users: []
      }
      if(channels[i].type === "voice"){
        let members = channels[i].members.array();
        for(let j = 0; j < members.length; j++){
          respObj.users.push(members[j].user.username);
        }
      }
      respArray.push(respObj);
    }
    response.json(respArray);
  }

  const getUsers = (request, response) => {
    let users = client.users.array();
    let respArray = [];
    for(let i = 0; i < users.length; i++){
      if(users[i].bot) continue;
      let respObj = {
        username: users[i].username,
        status: users[i].presence.status
      }
      respArray.push(respObj);
    }
    response.json(respArray);
  }

  infoModule = {
    getChannels: getChannels,
    getUsers: getUsers
  };

  return infoModule;
}
