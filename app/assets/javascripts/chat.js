$(document).ready(function() {

  // Setup
  var roomSession = $("#room-session").val();
  if (typeof roomSession !== "undefined") {
    var firebase = new firebaseSetup(roomSession);
  }

  // Recieve a message
  firebase.chat.on("child_added", recieveMessage);

  // Send a message
  $("#chat-form").submit(function(event) {
    event.preventDefault();
    var name = $("#user-name").val()
    var content = $("#msg-input").val()
    $("#msg-input").val("");
    sendMessage(firebase, name, content);
  });

});

function firebaseSetup(roomSession) {
  this.ref = new Firebase("https://haunted.firebaseio.com/");
  this.room = this.ref.child(roomSession);
  this.chat = this.room.child("chat");
}

var recieveMessage = function(snapshot) {
  var message = snapshot.val().message;
  var name = message.name;
  var content = message.content;
  var user = ((name === "Rootul") ? "me" : "you"); //Set Rootul to user.name
  var output = "<div class='message " + user + "'>";
        output += "<span>" + content + "</span>";
        output += "</div>";
  $("#msg-output").append(output);
}

var sendMessage = function(firebase, name, content) {
  firebase.chat.push({
    message : {
      name: name,
      content: content,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
  });
}