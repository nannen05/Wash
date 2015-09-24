var firstname = document.getElementById('firstname');
var city = document.getElementById('detailer-city');
var rating = document.getElementById('rating');
var image = document.getElementById('picture');
var basicWash = document.getElementById('basicwash');
var superWash = document.getElementById('superwash');
var deluxeWash = document.getElementById('deluxewash');

function detailerString () {
  var data = new Object();
  data.firstname = firstname.value;
  data.rating = rating.value;
  data.city = city.value;
  data.image = image.value;
  data.basicwash = basicWash.value;
  data.superwash = superWash.value;
  data.deluxewash = deluxeWash.value;
  return JSON.stringify(data);
}

function sendNewDetailer(e) {
  e.preventDefault()
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/add-detailers', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(detailerString ());
}

var submit = document.getElementById('submit');
submit.addEventListener('click', function(e){
  upload();sendNewDetailer(e);
}, false );

function upload() {
  var input = document.querySelector('input[type=file]'),
      file = input.files[0];

  if (!file || !file.type.match(/image.*/)) return;

  var fd = new FormData();
  fd.append("file", file);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload");
  xhr.send(fd);
}

