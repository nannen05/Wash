var globalWashType;
var globalCity;

var results = document.getElementById('results');
var startResults = document.getElementById('start-results');

results.style.display = 'none';
startResults.className = 'result';

function sendWashType(e) {
  e.preventDefault()
  var target = e.target;
  var targetData = target.getAttribute('data-wash-type');
  globalWashType = targetData;
}

function hideWashType(e){
  var selectedWashType = document.getElementById('selected-wash-type'); //Get Wash Type Id in Cities Block
  var textp = document.createElement('p'); //Build Out Wash Type Response
  selectedWashType.appendChild(textp);
  textp.textContent = 'You Have Selected: ' + globalWashType;
}

var parentWash = document.getElementById('wash-container');

parentWash.addEventListener('click', function(e) {
  sendWashType(e);
  hideWashType(e);
  parentWash.style.display = "none";
  cities.style.display = "block";
}, false);

var selectedcity  = document.getElementById('selectedcity');

function citySelect(e) {
  e.preventDefault();
  var locations = document.getElementById('locations');
  var selected = locations.options[locations.selectedIndex];
  globalCity = selected;
}

selectedcity.addEventListener('click', function(e) {
  citySelect(e);
  buildResults();
  cities.style.display = "none";
  results.style.display= "block";
}, false);

//Create Column Divs
//var resultDivimage = document.createElement('div');
//var resultDivname = document.createElement('div');
//var resultDivrating = document.createElement('div');
//var resultDivprice = document.createElement('div');

function getdb(callback) {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/show-detailers', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.onload = function () {
    var data = xhr.responseText;
    var jsonResponse = JSON.parse(data);
    callback(jsonResponse);
  };
  xhr.send(null);
};

var jsondetailers;
getdb(function (result) {
  jsondetailers = result;
});

function buildResults() {
  for (var i = 0; i < jsondetailers.length; i++) {
    if (globalCity.value == jsondetailers[i].city) {

      var resultDivimage = document.createElement('div');
      var resultDivname = document.createElement('div');
      var resultDivrating = document.createElement('div');
      var resultDivprice = document.createElement('div');
      var citylisting = document.getElementById('citylisting');
      citylisting.textContent = 'Showing Detailers for ' + globalCity.value;

      buildImage(i, resultDivimage);
      buildName(i, resultDivname);
      buildRatings(i, resultDivrating);
      buildPrices(i , resultDivprice);
      blockMaker(i, resultDivimage, resultDivname, resultDivrating, resultDivprice );


    } else {
    //console.log('No City Match')
    }
  }
}

function blockMaker(i, resultDivimage, resultDivname, resultDivrating, resultDivprice ) {
  var createRow = document.createElement('div');
  createRow.className = 'row result-block';
  startResults.appendChild(createRow);
  createRow.setAttribute('data-result-number', i);
  //var attr = createRow.attributes['data-result-number'];
  //console.log(attr);

  //Append New blocks To new Row
  createRow.appendChild(resultDivimage);
  createRow.appendChild(resultDivname);
  createRow.appendChild(resultDivrating);
  createRow.appendChild(resultDivprice);
}
//Create Specific Columns
function buildImage(dbrefrence, resultDivimage) {
  var imagePath = "<img src='/uploads/" + jsondetailers[dbrefrence].img + "'/>";
  resultDivimage.className = "col-md-3 image";
  var paragraphimage = document.createElement('div');
  resultDivimage.appendChild(paragraphimage);
  paragraphimage.innerHTML = imagePath;
  if (jsondetailers[dbrefrence].img == undefined) {
    paragraphimage.innerHTML = "<img src='uploads/defaultpic.png'/>";
  } else {
  return imagePath;
  }
}
function buildName(dbrefrence, resultDivname) {
  resultDivname.className = "col-md-3 name";
  var paragraph = document.createElement('h2');
  resultDivname.appendChild(paragraph);
  paragraph.textContent = jsondetailers[dbrefrence].first_name;
}
function buildRatings(dbrefrence, resultDivrating) {
  function ratings() {
    if (jsondetailers[dbrefrence].rating === 1) {
      return rating = "<img src='../images/stars.png'>";
    } else if (jsondetailers[dbrefrence].rating === 2) {
      return rating = "<img src='../images/stars.png'><img src='../images/stars.png'>";
    } else if (jsondetailers[dbrefrence].rating === 3) {
      return rating = "<img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'>";
    } else if (jsondetailers[dbrefrence].rating === 4) {
      return rating = "<img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'>";
    } else {
      return rating = "<img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'><img src='../images/stars.png'>";
    }
  }
  var starRating = ratings();
  resultDivrating.className = "col-md-3 rating";
  var paragraphrating = document.createElement('p');
  resultDivrating.appendChild(paragraphrating);
  paragraphrating.innerHTML = starRating;
}
function buildPrices (dbrefrence, resultDivprice) {
   function findWashType() {
    if(globalWashType == 'Basic')  {
       return wash = jsondetailers[dbrefrence].basic_wash;
    } else if (globalWashType == 'Super'){
       return wash = jsondetailers[dbrefrence].super_wash;
    } else if (globalWashType == 'Deluxe') {
     return  wash = jsondetailers[dbrefrence].deluxe_wash;
    }
  }
  var wash = findWashType();
  resultDivprice.className = "col-md-3 price";
  var paragraphprice = document.createElement('p');
  resultDivprice.appendChild(paragraphprice);
  paragraphprice.textContent = '$'+ wash;
}

