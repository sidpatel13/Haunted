var modals = {}

modals.confirmP1 = function(roomSession) {

  currentPlayer = "player1";
  fb.player1.set(true);

  vex.dialog.alert({
    message:'Send your friend this url to play!<br><input id="game-url" type="text" value="http://haunted-game.herokuapp.com/' + roomSession + '"><br>You are playing Hero.<br>',
    callback: function(value) {
      if (value) {
        fb.pause.set(true);
      }
    }
  });
 }

 modals.confirmP2 = function() {
  vex.dialog.alert({
    message: "You've been invited to play Haunted! You are playing Ghost.",
    callback: function(value) {
      if (value) {
        currentPlayer = "player2";
        fb.player2.set(true);
        fb.pause.set(false);
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
