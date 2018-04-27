/*eslint no-undef:0*/

let BLOCKCHAIN_URL = "https://anthony-blockchain.us-south.containers.mybluemix.net";
let BLOCKCHAIN_SOCKET = "http://169.61.17.173:3030"

class Events {
  constructor() {
    var self = this;
    self.block = io.connect(BLOCKCHAIN_SOCKET + '/block');
    self.block.on('block', (data) => {
      self.update(JSON.parse(data));
    });
    self.block.on('connect', () => {
      console.log("Connected");
    });
    self.requestBlocks();
  }
  requestBlocks() {
    var query = {
      type: "blocks",
      queue: "seller_queue",
      params: {
        "noOfLastBlocks": "20"
      }
    };
    var self = this;
    $.ajax({
      url: BLOCKCHAIN_URL + "/api/execute",
      type: "POST",
      data: JSON.stringify(query),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        data = typeof data !== "string" ? data : JSON.parse(data);
        console.log(" Result ID " + data.resultId);
        self.getResults(data.resultId, 0, self);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);
      }
    });
  }

  getResults(resultId, attemptNo, self) {
    if(attemptNo < 60) {
      //console.log("Attempt no " + attemptNo);
      $.get(BLOCKCHAIN_URL + "/api/results/" + resultId).done(function (data) {
        data = typeof data !== "string" ? data : JSON.parse(data);
        // console.log(" Status  " + data.status);
        if(data.status === "done") {
          self.loadBlocks(JSON.parse(data.result));
        } else {
          setTimeout(function () {
            self.getResults(resultId, attemptNo + 1, self);
          }, 3000);
        }
      }).fail(function () {
        console.log("error");
      });
    } else {
      console.error("exceeded Number of attempts");
    }
  }

  //{"id":"17","fingerprint":"151e2fec76aacd117276","transactions":[{"type":"ENDORSER_TRANSACTION","timestamp":"Fri Jan 19 2018 15:38:22 GMT-0800 (PST)"}]}
  update(eventData) {
    var anchor = document.getElementById('blockAnchor');

    var formattedDate = new Date(eventData['transactions'][0]['timestamp']);
    var day = formattedDate.getDate();
    var month =  formattedDate.getMonth() + 1;
    var hours = formattedDate.getHours();
    var minutes = ("0" + formattedDate.getMinutes()).substr(-2);
    var seconds = ("0" + formattedDate.getSeconds()).substr(-2);
    var myDate = month + "/" + day + " - " + hours + ":" + minutes + ":" + seconds;

    var transactions = "";
    eventData['transactions'].forEach(function (transaction) {
      var block = document.createElement('div');

      block.className = 'block';
      block.innerHTML ='<div class="blocktop">'+
      '<div class="blockid">' + eventData.id + '</div>' +
          '<div class="blockprint">' +
            '<div class="printlabel">Fingerprint</div>' +
            '<div class="fingerprint">' + eventData.fingerprint + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="payload wordwrap">' + transaction['execution_response'][0].payload +  '</div>' +
        '<div class="blockbottom">' +
          '<div class="hash wordwrap">' + transaction.tx_id + '</div>' +
        '</div>' +
      '</div>'

      anchor.prepend(block);
    });
  }
  loadBlocks(data) {
    var anchor = document.getElementById('blockAnchor');

    data = data === "string" ? JSON.parse(data) : data;
    data = data.result.sort((a,b) => b.id - a.id);

    data.forEach(function(eventData) {

      var formattedDate = new Date(eventData['transactions'][0]['timestamp']);
      var day = formattedDate.getDate();
      var month =  formattedDate.getMonth() + 1;
      var hours = formattedDate.getHours();
      var minutes = ("0" + formattedDate.getMinutes()).substr(-2);
      var seconds = ("0" + formattedDate.getSeconds()).substr(-2);
      var myDate = month + "/" + day + " - " + hours + ":" + minutes + ":" + seconds;

      var transactions = "";
      eventData['transactions'].forEach(function (transaction) {
        var block = document.createElement('div');

        block.className = 'block';
        block.innerHTML ='<div class="blocktop">'+
        '<div class="blockid">' + eventData.id + '</div>' +
            '<div class="blockprint">' +
              '<div class="printlabel">Fingerprint</div>' +
              '<div class="fingerprint">' + eventData.fingerprint + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="payload wordwrap">' + transaction['execution_response'][0].payload +  '</div>' +
          '<div class="blockbottom">' +
            '<div class="hash wordwrap">' + transaction.tx_id + '</div>' +
          '</div>' +
        '</div>'
        
        anchor.append(block);
      });
    });
  }
}
new Events();
