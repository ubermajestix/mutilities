function init() {
  console.log('Init app.');

  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      console.log('API is ready');
      console.log(gapi.hangout);
      console.log(gapi.hangout.getParticipants());
      var me = gapi.hangout.getLocalParticipant();
      $('button.mute').click(function(){
        var participants = gapi.hangout.getParticipants();
        _.each(participants, function(participant){
          console.log(participant);
          gapi.hangout.av.muteParticipantMicrophone(participant.id);
        });
      });
      var push_to_talk = true;
      $('input[name="push_to_talk"]').change(function(){
         if($(this).val()=='mute'){
           push_to_talk = false;
           $('button.push_to_talk').text('push to mute');
         }
         else{
           push_to_talk = true;
           $('button.push_to_talk').text('push to talk');
         }
      });
      $('button.push_to_talk').mousedown(function(){
        me.setMicrophoneMute(!push_to_talk);
      });
      $('button.push_to_talk').mouseup(function(){
        me.setMicrophoneMute(push_to_talk);
      });
    }
  };

  // This application is pretty simple, but use this special api ready state
  // event if you would like to any more complex app setup.
  gapi.hangout.onApiReady.add(apiReady);
}
console.log('its alive!');
gadgets.util.registerOnLoadHandler(init);
