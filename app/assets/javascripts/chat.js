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
    var message = $("#msg-input").val()
    $("#msg-input").val("");
    sendMessage(firebase, name, message);
  });

});

function firebaseSetup(roomSession) {
  this.ref = new Firebase("https://haunted.firebaseio.com/");
  this.room = this.ref.child(roomSession);
  this.chat = this.room.child("chat");
}

var recieveMessage = function(snapshot) {
  var message = snapshot.val().message;
  $("#msg-output").append(message.name + " said: " + message.content + "<br>");
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