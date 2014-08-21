var modals = {}

modals.confirmP1 = function(roomSession) {
  vex.dialog.alert({
    message:'Send your friend this url to play!<br><input id="game-url" type="text" value="http://haunted-game.herokuapp.com/' + roomSession + '"><br>You are playing Hero.',
    callback: function(value) {
      if (value) {
        currentPlayer = "player1";
        fb.player1.set(true);
        modals.waiting();
      }
    }
  });
 }

modals.waiting = function() {
  vex.dialog.alert({
    message: "Waiting for your friend to join room."
  });
}

 modals.confirmP2 = function() {
  vex.dialog.alert({
    message: "You've been invited to play Haunted! You are playing Ghost.",
    callback: function(value) {
      if (value) {
        currentPlayer = "player2";
        fb.player2.set(true);
      }
    }
  })
 }

modals.instructions = function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert(instructions);
  }

modals.aboutUs = function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert(aboutUs);
  }
