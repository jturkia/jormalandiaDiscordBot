function loadPage(page){
  var xmlHttp = new XMLHttpRequest();
  var contentDiv = document.getElementById("main-content-div")
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      contentDiv.innerHTML = xmlHttp.responseText;
      var script = document.createElement("script");
      script.src = "js/" + page + ".js";
      contentDiv.append(script);
    }
  };

  xmlHttp.open("GET", "pages/" + page + ".html", true);
  xmlHttp.send(null)
}

loadPage("suggestion");
