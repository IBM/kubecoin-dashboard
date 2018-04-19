/* standing object

{ rank: 1,
  avatar: "./images/Artboard 1.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
} */

var standingdata = [{
  rank: 1,
  avatar: "./images/Artboard 1.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 2,
  avatar: "./images/Artboard 2.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 3,
  avatar: "./images/Artboard 3.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 4,
  avatar: "./images/Artboard 4.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 5,
  avatar: "./images/Artboard 5.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
},{
  rank: 6,
  avatar: "./images/Artboard 6.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
},{
  rank: 7,
  avatar: "./images/Artboard 1.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 8,
  avatar: "./images/Artboard 2.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 9,
  avatar: "./images/Artboard 3.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 10,
  avatar: "./images/Artboard 4.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}, {
  rank: 11,
  avatar: "./images/Artboard 5.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
},{
  rank: 12,
  avatar: "./images/Artboard 6.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
}];


var blockData = [];

var exampleBlock = {
  blockid: 1545,
  fingerprint: "d7ad5887463dd2232c05",
  payload:"{'id':'0ca96f1b-c91e-4ce3-a094-0e5dec53b74c','memberType':'user','fitcoinsBalance':0,'totalSteps':0,'stepsUsedForConversion':0,'contractIds':null}",
  hash: "94dd147533d044bd3a6a982290376803abff57b311d95e119ef8ce22f23a1195"
}

/* blockchain test data */

for( var b = 0; b < 20; b++ ){
  blockData.push(exampleBlock)
}

function addBlock(data){
  var anchor = document.getElementById('blockAnchor');
  var block = document.createElement('div');
  block.className = 'block';

  block.innerHTML ='<div class="blocktop">'+
  '<div class="blockid">' + data.blockid + '</div>' +
      '<div class="blockprint">' +
        '<div class="printlabel">Fingerprint</div>' +
        '<div class="fingerprint">' + data.fingerprint + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="payload wordwrap">' + data.payload +  '</div>' +
    '<div class="blockbottom">' +
      '<div class="hash wordwrap">' + data.hash + '</div>' +
    '</div>' +
  '</div>'

  anchor.append(block);
}

function addBlocks(blocks){
  for(var s= 0; s< blocks.length; s++){
    addBlock(blocks[s])
  }
}

function addStanding(data) {
  var anchor = document.getElementById('leaderAnchor');
  var standing = document.createElement('div');
  standing.className = 'standing';

  standing.innerHTML = '<div class="rank">' + data.rank + '</div>' +
    '<div class="avatarHolder"><img class="avatar" src="' + data.avatar + '"></div>' +
    '<div class="standingData">' +
    '<div class="personName">' + data.name + '</div>' +
    '<div class="personData">' + data.steps + ' steps, ' + data.distance + 'km</div></div>';

  anchor.appendChild(standing);
}

function addStandings(standings) {
  for(var s= 0; s< standings.length; s++){
    addStanding(standings[s])
  }
}

function createDashboard() {
  addStandings(standingdata);
    addBlocks(blockData);
}
