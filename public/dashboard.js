/* standing object

{ rank: 1,
  avatar: "./images/Artboard 1.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
} */
google.charts.load('current', {'packages':['corechart']});

let URL = "https://anthony-blockchain.us-south.containers.mybluemix.net"

// var blockData = [];
var map = new Map();

// var exampleBlock = {
//   blockid: 1545,
//   fingerprint: "d7ad5887463dd2232c05",
//   payload:"{'id':'0ca96f1b-c91e-4ce3-a094-0e5dec53b74c','memberType':'user','fitcoinsBalance':0,'totalSteps':0,'stepsUsedForConversion':0,'contractIds':null}",
//   hash: "94dd147533d044bd3a6a982290376803abff57b311d95e119ef8ce22f23a1195"
// }
//
// /* blockchain test data */
//
// for( var b = 0; b < 20; b++ ){
//   blockData.push(exampleBlock)
// }

// function addBlock(data){
//   var anchor = document.getElementById('blockAnchor');
//   var block = document.createElement('div');
//   block.className = 'block';
//
//   block.innerHTML ='<div class="blocktop">'+
//   '<div class="blockid">' + data.blockid + '</div>' +
//       '<div class="blockprint">' +
//         '<div class="printlabel">Fingerprint</div>' +
//         '<div class="fingerprint">' + data.fingerprint + '</div>' +
//       '</div>' +
//     '</div>' +
//     '<div class="payload wordwrap">' + data.payload +  '</div>' +
//     '<div class="blockbottom">' +
//       '<div class="hash wordwrap">' + data.hash + '</div>' +
//     '</div>' +
//   '</div>'
//
//   anchor.append(block);
// }

function addBlocks(blocks){
  for(var s= 0; s< blocks.length; s++){
    addBlock(blocks[s])
  }
}

function addStanding(data, index) {
  var anchor = document.getElementById('leaderAnchor');
  var standing = document.createElement('div');
  var avatarHolder = document.createElement('div');

  standing.className = 'standing';
  avatarHolder.className = 'avatarHolder';

  var image = new Image();
  image.src = 'data:image/png;base64,' + data.png;
  image.className = 'avatar'
  avatarHolder.appendChild(image);
  standing.appendChild(avatarHolder);


  anchor.appendChild(standing).appendChild(avatarHolder).appendChild(image);
  var position = 0;
  if (map.get(data.steps) != undefined) {
    position = map.get(data.steps);
  } else {
    map.set(data.steps, index+1);
    position = index + 1;
  }
  standing.innerHTML = '<div class="rank">' + position + '</div>' + standing.innerHTML  +
    '<div class="standingData">' +
    '<div class="personName">' + data.name + '</div>' +
    '<div class="personData">' + data.steps + ' steps</div></div>';
}

function addStandings(standings) {
  for(var s= 0; s< standings.length; s++){
    addStanding(standings[s], s);
  }
}

function getStandingData() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);

      addStandings(data);
    }
  };
  xmlhttp.open("GET", URL + "/leaderboard/top/100", true);
  xmlhttp.send();
}

function getTotalUsers() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);

      document.getElementById('numberOfParticipants').innerHTML = data.count;
    }
  };
  xmlhttp.open("GET", URL + "/registerees/totalUsers", true);
  xmlhttp.send();
}

function getTotalSteps() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);

      document.getElementById('numberOfSteps').innerHTML = data[0].count;
      document.getElementById('distanceWalked').innerHTML = Math.floor((data[0].count * 0.762)/1000);
    }
  };
  xmlhttp.open("GET", URL + "/registerees/totalSteps", true);
  xmlhttp.send();
}

function getTotalDevices() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);

      var ios = Math.round(100 * data.ios/ (data.android+data.ios));
      var android = 100 - ios;
      document.getElementById('totalDevices').innerHTML = ios + " / " + android;

      google.charts.setOnLoadCallback(drawChart(android, ios));
    }
  };
  xmlhttp.open("GET", URL + "/registerees/deviceTotals", true);
  xmlhttp.send();
}

function drawChart(android, ios) {
  console.log(android + " " + ios);
  var data = google.visualization.arrayToDataTable([
    ['Devices', 'number of devices'],
    ['android', android],
    ['ios', ios]
  ]);

  var options = {
    'width':135,
    'height':135,
    'legend' : {'position':'none'},
    'chartArea':{'left':0,'top':0},
    'backgroundColor':'none',
    'colors':['#b61c50','#C3DBD4'],
    'tooltip':{'trigger': 'none'},
    'enableInteractivity':'false',
    'pieSliceText':'none'
  }

  var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  chart.draw(data,options);
}

// function onScroll() {
//   var obj = document.getElementById('leaderAnchor');
//   if( obj.scrollTop >= (obj.scrollHeight - obj.offsetHeight)) {
//       console.log("onScroll");
//   }
// }

function createDashboard() {
  // addStandings(standingdata);
  // addBlocks(blockData);
  getStandingData();
  getTotalUsers();
  getTotalSteps();
  getTotalDevices();
}
