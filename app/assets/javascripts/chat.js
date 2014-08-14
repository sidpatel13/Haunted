$( document ).ready(function() {
  console.log( "Ready!" );
  var myFirebaseRef = new Firebase("https://haunted.firebaseio.com/");
  var roomSession = $( "#room-session" ).val();
  var myFirebaseRoom = myFirebaseRef.child(roomSession);
  var myFirebaseChat = myFirebaseRoom.child("chat")
  myFirebaseChat.on("child_added", function(snapshot) {
    var message = snapshot.val().message;
    $( "#msg-output" ).append(message.name + " said: " + message.content + "<br>");
  });

  $( "#chat-form" ).submit(function( event ) {
    event.preventDefault();
    
    var userName = $('#user-name').val()
    var messageContent = $('#msg-input').val()
    $( "#msg-input" ).val("");

    myFirebaseChat.push({
      message : {
        name: userName,
        content: messageContent,
        timestamp: Firebase.ServerValue.TIMESTAMP
      }
    });
  });
});