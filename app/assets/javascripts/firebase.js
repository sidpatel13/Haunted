var firebase = {}

firebase.firebaseSetup = function(roomSession) {
  this.ref = new Firebase("https://haunted.firebaseio.com/");
  this.room = this.ref.child(roomSession);
  this.chat = this.room.child("chat");
  this.game = this.room.child("game");
  this.pause = this.game.child("pause");
  this.player1 = this.game.child("player1");
  this.player2 = this.game.child("player2");
  this.person = this.game.child("person");
  this.ghost1 = this.game.child("ghost1");
  // this.ghost2 = this.game.child("ghost2");
  // this.ghost3 = this.game.child("ghost3");
  // this.ghost4 = this.game.child("ghost4");
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
