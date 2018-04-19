/* standing object

{ rank: 1,
  avatar: "./images/Artboard 1.png",
  name: 'Gustavo Lambert',
  steps: 25000,
  distance: 2
} */

var standings = [{
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

function addStandings() {

  for(var s= 0; s< standings.length; s++){
    addStanding(standings[s])
  }

// standings.forEach(standing){}

  // standings.forEach(standing) {
  //   addStanding(standing);
  // }
}

function createDashboard() {
  addStandings();
}
