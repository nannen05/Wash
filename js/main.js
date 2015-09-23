var globalWashType;
var globalCity;

var results = document.getElementById('results');
results.style.display = 'none';

function sendWashType(e) {
  e.preventDefault()
  var target = e.target;
  var targetData = target.getAttribute('data-wash-type');
  function washType () {
    var data = new Object();
    data.wash = targetData;
    return JSON.stringify(data);
  }
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/wash', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(washType());
  console.log(targetData);
  globalWashType = targetData;
}

function hideWashType(e){
  parentWash.style.display = "none";
  cities.style.display = "block";

  //Get Wash Type Id in Cities Block
  var selectedWashType = document.getElementById('selected-wash-type');

  //Build Out Wash Type Response
  var textp = document.createElement('p');
  selectedWashType.appendChild(textp);
  textp.textContent = 'You Have Selected: ' + globalWashType;
}

var cities = document.getElementById('cities');
var parentWash = document.getElementById('wash-container');
parentWash.addEventListener('click', function(e) {
  sendWashType(e);hideWashType(e)
}, false);


function citySelect(e) {
  e.preventDefault();
  var locations = document.getElementById('locations');
  var options = locations.options;
  var selected = locations.options[locations.selectedIndex];
  globalCity = selected;
  console.log(selected.value);
  cities.style.display = "none";
  results.style.display= "block"
}

var selectedcity  = document.getElementById('selectedcity');
selectedcity.addEventListener('click', function(e) {
  citySelect(e);buildResults();
}, false);


//Build Results
function buildResults() {
  var startResults = document.getElementById('start-results');
  startResults.className = 'result';
  //Request from DB
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/show-detailers', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        console.log(data);

        for (var i = 0; i < jsonResponse.length; i++) {

          if (globalCity.value == jsonResponse[i].city) {
            // Detail Values from db
            var name = jsonResponse[i].first_name;
            var image = jsonResponse[i].img;
            var rating = jsonResponse[i].rating;
            var basic = jsonResponse[i].basic_wash;
            var superwash = jsonResponse[i].super_wash;
            var deluxe = jsonResponse[i].deluxe_wash;
            //var location = detailers.detailers[i].location[1];
            var wash;


            startResults.addEventListener('click' , function(e){
                var target = e.target;
                console.log(target);
            }, false)

            var imagepath = "<img src='uploads/" + image + "'/>";
            console.log(imagepath);

            if(globalWashType == 'Basic')  {
              wash = basic;
            } else if (globalWashType == 'Super'){
              wash = superwash;
            } else if (globalWashType == 'Deluxe') {
              wash = deluxe;
            }

            // Create New Row
            var createRow = document.createElement('div');
            createRow.className = 'row result-block';
            createRow.setAttribute('data-result-number', i);
            startResults.appendChild(createRow);


            // Image Block
            var resultDivimage = document.createElement('div');
            resultDivimage.className = "col-md-3 image";
            startResults.appendChild(resultDivimage);
            var paragraphimage = document.createElement('div');
            resultDivimage.appendChild(paragraphimage);
            //paragraphimage.innerHTML ="<img src=\"" + image + "\">";
            //resultDivimage.innerHTML = "<img src='images/defaultpic.png'>";
            paragraphimage.innerHTML = imagepath;
            //resultDivimage.innerHTML = imagepath;

            // Name Block
            var resultDivname = document.createElement('div');
            resultDivname.className = "col-md-3 name";
            //startResults.appendChild(resultDivname);
            var paragraph = document.createElement('h2');
            resultDivname.appendChild(paragraph);
            paragraph.textContent = name;

            // Rating Block
            if (rating === 1) {
              rating = "<img src='../images/stars.png'>";
            } else if (rating === 2) {
              rating = "<img src='../images/stars.png'><img src='../images/stars.png'>";
            } else if (rating === 3) {
              rating = "<img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'>";
            } else if (rating === 4) {
              rating = "<img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'>";
            } else {
              rating = "<img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'>";
            }

            var resultDivrating = document.createElement('div');
            resultDivrating.className = "col-md-3 rating";
            //startResults.appendChild(resultDivrating);
            var paragraphrating = document.createElement('p');
            resultDivrating.appendChild(paragraphrating);
            paragraphrating.innerHTML = rating;

            // Price Block
            var resultDivprice = document.createElement('div');
            resultDivprice.className = "col-md-3 price";
            //startResults.appendChild(resultDivprice);
            var paragraphprice = document.createElement('p');
            resultDivprice.appendChild(paragraphprice);
            paragraphprice.textContent = '$'+wash;

            //Append New blocks To new Row
            createRow.appendChild(resultDivimage);
            createRow.appendChild(resultDivname);
            createRow.appendChild(resultDivrating);
            createRow.appendChild(resultDivprice);
          } else {
            //console.log('No One Available in those cities');
          }
        }
      }
    }
  };
  xhr.send(null);
}











