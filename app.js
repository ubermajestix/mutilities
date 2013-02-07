function init() {
  console.log('Init app.');

  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      console.log('API is ready');
      console.log(gapi.hangout);
      console.log(gapi.hangout.getParticipants());
      gapi.hangout.av.setParticipantAudible(
        participantId,
        false
      );
    }
  };

  // This application is pretty simple, but use this special api ready state
  // event if you would like to any more complex app setup.
  gapi.hangout.onApiReady.add(apiReady);
}
console.log('its alive!');
gadgets.util.registerOnLoadHandler(init);
