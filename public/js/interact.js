console.log("It works too!");

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

getVoiceList();
