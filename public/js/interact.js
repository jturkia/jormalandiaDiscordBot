function getVoiceList(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        var data = JSON.parse(xmlhttp.responseText);
        createButtons(data);
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("GET", "/api/bot/voices", true);
  xmlhttp.send(null);
}

function createButtons(data){
  var contentDiv = document.getElementById("voice-div");
  contentDiv.innerHTML = "";
  for(var i = 0; i < data.length; i++){
    var div = document.createElement("div");
    div.classList.add("voice-button");
    div.setAttribute("data", data[i]);
    div.innerHTML = data[i];
    div.addEventListener("click", function(){
      playVoice(this);
    });
    contentDiv.append(div);
  }
  var youtubeDiv = document.createElement("div");
  youtubeDiv.classList.add("youtube-div");
  var youtubeSpan = document.createElement("span");
  youtubeSpan.innerHTML = "Send youtube link for voice";
  var youtubeInput = document.createElement("input");
  youtubeInput.id = "youtube-link-input";
  var youtubeButton = document.createElement("button");
  youtubeButton.innerHTML = "Send";
  youtubeButton.addEventListener("click", playYoutubeLink);
  youtubeDiv.append(youtubeSpan);
  youtubeDiv.append(youtubeInput);
  youtubeDiv.append(youtubeButton);
  contentDiv.append(youtubeDiv);
}

function playVoice(elem){
  var filename = elem.getAttribute("data");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        console.log("Sent " + filename + " for playing");
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("GET", "/api/bot/play-voice/" + filename, true);
  xmlhttp.send(null);
}

function playYoutubeLink(){
  var link = document.getElementById("youtube-link-input").value;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        console.log("Sent " + link + " for playing");
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("GET", "/api/bot/play-youtube/" + encodeURIComponent(link), true);
  xmlhttp.send(null);
}

function getChannelList(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        var data = JSON.parse(xmlhttp.responseText);
        createChannelList(data);
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("GET", "/api/channels", true);
  xmlhttp.send(null);
}

function getUserList(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        var data = JSON.parse(xmlhttp.responseText);
        createUserList(data);
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("GET", "/api/users", true);
  xmlhttp.send(null);
}

function createChannelList(data){
  var contentUl = document.getElementById("channel-div-list");
  contentUl.innerHTML = "";
  for(var i = 0; i < data.length; i++){
    var li = document.createElement("li");
    li.innerHTML = "<span class='channel-label'>" + data[i].type + " channel - " + data[i].name + "</span>";
    if(data[i].type === "text"){
      var sendMessageInput = document.createElement("input");
      sendMessageInput.id = "text-channel-" + data[i].name;
      sendMessageInput.type = "text";
      var sendMessageButton = document.createElement("button");
      sendMessageButton.innerHTML = "Send message";
      sendMessageButton.setAttribute("data", data[i].name);
      sendMessageButton.addEventListener("click", function(){
        var text = document.getElementById("text-channel-" + this.getAttribute("data")).value;
        var channel = this.getAttribute("data");
        var tts = document.getElementById("tts-" + this.getAttribute("data")).checked;
        console.log("Sending " + text + " to channel " + channel + " with tts option: " + tts);
        sendMessage(text, "channel", channel, tts);
      });
      var ttsLabel = document.createElement("span");
      ttsLabel.innerHTML = "TTS:";
      ttsLabel.classList.add("tts-label");
      var sendMessageTTSCheck = document.createElement("input");
      sendMessageTTSCheck.type = "checkbox";
      sendMessageTTSCheck.id = "tts-" + data[i].name;
      li.append(sendMessageInput);
      li.append(sendMessageButton);
      li.append(ttsLabel);
      li.append(sendMessageTTSCheck);
    }
    else if(data[i].type === "voice"){
      var joinVoiceButton = document.createElement("button")
      joinVoiceButton.innerHTML = "Join voice channel " + data[i].name;
      joinVoiceButton.setAttribute("data", data[i].name);
      joinVoiceButton.addEventListener("click", function(){
        joinVoice(this.getAttribute("data"));
      });
      var ul = document.createElement("ul");
      for(var j = 0; j < data[i].users.length; j++){
        var userLi = document.createElement("li");
        userLi.innerHTML = data[i].users[j];
        ul.append(userLi);
      }
      li.append(joinVoiceButton);
      li.append(ul);
    }
    contentUl.append(li);
  }
}

function createUserList(data){
  var contentUl = document.getElementById("user-div-list");
  contentUl.innerHTML = "";
  for(var i = 0; i < data.length; i++){
    var li = document.createElement("li");
    li.innerHTML =  "<span class='user-label'>" + data[i].username + " - " + data[i].status + "</span>";
    var sendMessageInput = document.createElement("input");
    sendMessageInput.id = "dm-channel-" + data[i].username;
    sendMessageInput.type = "text";
    var sendMessageButton = document.createElement("button");
    sendMessageButton.innerHTML = "Send message";
    sendMessageButton.setAttribute("data", data[i].username);
    sendMessageButton.addEventListener("click", function(){
      var text = document.getElementById("dm-channel-" + this.getAttribute("data")).value;
      var user = this.getAttribute("data");
      var tts = document.getElementById("tts-" + this.getAttribute("data")).checked;
      console.log("Sending " + text + " to user " + user + " with tts option: " + tts);
      sendMessage(text, "user", user, tts);
    });
    var ttsLabel = document.createElement("span");
    ttsLabel.innerHTML = "TTS:";
    ttsLabel.classList.add("tts-label");
    var sendMessageTTSCheck = document.createElement("input");
    sendMessageTTSCheck.type = "checkbox";
    sendMessageTTSCheck.id = "tts-" + data[i].username;
    li.append(sendMessageInput);
    li.append(sendMessageButton);
    li.append(ttsLabel);
    li.append(sendMessageTTSCheck);
    contentUl.append(li);
  }
}

function sendMessage(text, type, channel, tts){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        console.log(xmlhttp.responseText);
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("POST", "/api/bot/message", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify({
    message: text,
    type: type,
    channel_name: channel,
    tts: tts
  }));
}

function joinVoice(channel){
  console.log("Joining voice channel " + channel);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        console.log("Ok");
      }
      else{
        console.log("Error!");
      }
    }
  }
  xmlhttp.open("GET", "/api/bot/join-voice/" + channel, true);
  xmlhttp.send(null);
}

getVoiceList();
getChannelList();
getUserList();
