function getSuggestionList(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState === 4){
      if(xmlHttp.status === 200){
        var data = JSON.parse(xmlHttp.responseText);
        createSuggestionList(data);
      }
      else {
        console.log("error");
      }
    }
  };
  xmlHttp.open("GET", "/api/suggestions", true);
  xmlHttp.send(null);
}

function createSuggestionList(data){
  var contentDiv = document.getElementById("suggestion-content");
  var ul = document.createElement("ul");
  for(var i = 0; i < data.length; i++){
    var splitted = data[i].split("-");
    var suggestor = splitted[0];
    var date = null;
    var timeString = ""
    if(splitted.length > 1){
      date = new Date(parseInt(splitted[1]));
      day = date.getDate();
      month = date.getMonth() + 1;
      year = date.getFullYear();
      hour = (date.getHours() <= 9) ? "0" + date.getHours() : date.getHours();
      minute = (date.getMinutes() <= 9) ? "0" + date.getMinutes() : date.getMinutes();
      timeString = day + "." + month + "." + year + " " + hour + ":" + minute;
    }
    var suggestorSpan = document.createElement("span");
    suggestorSpan.innerHTML = suggestor;
    suggestorSpan.classList.add("suggestor")
    var timeSpan = document.createElement("span");
    timeSpan.innerHTML = timeString;
    timeSpan.classList.add("timestamp");
    var li = document.createElement("li");
    li.classList.add("li-suggestion")
    li.classList.add("closed");
    li.append(suggestorSpan);
    li.append(timeSpan);
    li.setAttribute("data", data[i]);
    li.addEventListener("click", function(e){
      openSuggestion(this);
    });
    ul.append(li);
  }
  contentDiv.append(ul);
}

function openSuggestion(elem){
  if(elem.classList.contains("open")) return;
  elem.classList.remove("closed");
  elem.classList.add("open");
  var listElements = document.getElementsByClassName("li-suggestion");
  for(var i = 0; i < listElements.length; i++){
    if(listElements[i] === elem) continue;
    listElements[i].classList.remove("open");
    listElements[i].classList.add("closed");
  }
  var id = elem.getAttribute("data");
  getSuggestion(elem, id)
}

function getSuggestion(elem, id){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState === 4){
      if(xmlHttp.status === 200){
        var data = JSON.parse(xmlHttp.responseText);
        console.log(data);
      }
      else {
        console.log("error");
      }
    }
  };
  xmlHttp.open("GET", "/api/suggestion/" + id, true);
  xmlHttp.send(null);
}

function updateSuggestion(){

}

function deleteSuggestion(){

}

getSuggestionList();
