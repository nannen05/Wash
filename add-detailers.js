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
  sendNewDetailer(e);
}, false );

function showdb() {
  //e.preventDefault()
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/show-detailers', true);
  xhr.setRequestHeader("Content-type","application/json");
  //xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        //console.log(jsonResponse[{first_name}]);
        console.log(data);
        var showData = document.getElementById('showdb');
        showData.textContent = jsonResponse[0].first_name;
      }
    }
  };
  xhr.send(null);

}
showdb();