function getuser(callback) {
  var windowUrl = window.location.href;
  function getWindowUrl(url){
    return url.split('/').pop()
  }
  var newurl = getWindowUrl(windowUrl);
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/view/' + newurl, true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.onload = function () {
    var data = xhr.responseText;
    var jsonResponse = JSON.parse(data);
    jsonuser = jsonResponse;
    callback(jsonResponse);
  };
  xhr.send(null);
};




