$( document ).ready(function() {
  console.log( "Ready!" );
  var myFirebaseRef = new Firebase("https://haunted.firebaseio.com/");

  myFirebaseRef.child("chat").on("value", function(snapshot) {  
    $( "#msg-output" ).append(snapshot.val().author + " said: " + snapshot.val().message + "<br>");
    $( "#msg-input" ).val("");
  });

  $( "#chat-form" ).submit(function( event ) {
    event.preventDefault();

    myFirebaseRef.set({
      chat: {
        message: $('#msg-input').val(),
        author: "Julius"
      } 
    });
  });
});