var firstname = document.getElementById('firstname');
var location;
var basicWash = document.getElementById('basicwash');
var superWash = document.getElementById('superwash');
var deluxeWash = document.getElementById('deluxewash');

function detailerString () {
  var data = new Object();
  data.firstname = firstname.value;
  data.basicwash = basicWash.value;
  data.superwash = superWash.value;
  data.dexluewash = deluxeWash.value;
  return JSON.stringify(data);
}


function sendNewDetailer(e) {
  e.preventDefault()
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/detailers', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(detailerString ());
}

var submit = document.getElementById('submit');
submit.addEventListener('click', function(e){
  sendNewDetailer(e);
}, false );