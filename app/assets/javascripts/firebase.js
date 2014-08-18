var firebase = {}

firebase.firebaseSetup = function(roomSession) {
  this.ref = new Firebase("https://haunted.firebaseio.com/");
  this.room = this.ref.child(roomSession);
  this.chat = this.room.child("chat");
  this.game = this.room.child("game");
  this.person = this.game.child("person");
  this.ghost1 = this.game.child("ghost1");
}

firebase.recieveMessage = function(snapshot) {
  var message = snapshot.val().message;
  var name = message.name;
  var content = message.content;
  var user = ((name === "Rootul") ? "me" : "you"); //Set Rootul to user.name
  var output = "<div class='message " + user + "'>";
        output += "<span>" + content + "</span>";
        output += "</div>";
  $("#msg-output").append(output);
}

firebase.sendMessage = function(firebase, name, content) {
  firebase.chat.push({
    message : {
      name: name,
      content: content,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
  });
}

firebase.sendCoordinates = function(sprite) {
  firebase.game.push({
    message : {
      sprite: sprite,
      x_coordinates: sprite.x,
      y_coordinates: sprite.y,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
  });
}
