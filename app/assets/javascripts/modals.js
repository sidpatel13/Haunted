var modals = {}

modals.urlModal = function(roomSession) {
   vex.dialog.alert({
     message:'Send your friend this url to play!<br><input id="game-url" type="text" value="http://haunted-game.herokuapp.com/' + roomSession + '">',
     callback: function() {
       modals.confirmPlayerModal();
     }
   });
 }

modals.confirmPlayerModal = function() {
   vex.dialog.buttons.YES.text = 'Hero';
   vex.dialog.buttons.NO.text = 'Ghost';
   vex.dialog.confirm({
     message: "Are you hero or ghost?",
     callback: function(value) {
       if (value) {
         currentPlayer = "player1";
         fb.player1.set(true);
       } else {
         currentPlayer = "player2";
         fb.player2.set(true);
       }
     }
   });
 }

modals.instructions = function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert(instructions);
  };

modals.aboutUs = function(){
    vex.dialog.buttons.YES.text = 'OK';
    vex.dialog.alert(aboutUs);
  };

 // vex.dialog.open({
 //   message: 'Choose your avatar:<br><br><img class="image" src="images/person.png"><img class="image" src="images/star.png"><img class="image" src="images/diamond.png">',
 //   buttons: [
 //     $.extend({}, vex.dialog.buttons.NO, { className: 'button', text: 'Person', click: function($vexContent, event) {
 //           $vexContent.data().vex.value = 'person';
 //           vex.close($vexContent.data().vex.id);
 //       }}),
 //     $.extend({}, vex.dialog.buttons.NO, { className: 'button', text: 'Star', click: function($vexContent, event) {
 //           $vexContent.data().vex.value = 'star';
 //           vex.close($vexContent.data().vex.id);
 //       }}),
 //     $.extend({}, vex.dialog.buttons.NO, { className: 'button', text: "Diamond", click: function($vexContent, event) {
 //           $vexContent.data().vex.value = 'diamond';
 //           vex.close($vexContent.data().vex.id);
 //       }})
 //   ],
 //    callback: function(value) {

 //     avatar = game.add.sprite(100, 100, value);
 //     avatar.scale.setTo(0.2, 0.2);
 //     avatar.anchor.setTo(0.5, 0.5);
 //    }
 // });
