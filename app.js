function Mute(){
  var self = this;
  this.me = gapi.hangout.getLocalParticipant();
  this.push_to_talk = true;
  $('button.mute').click(function(){ 
    self.mute();
  });
  this.push_to_talk();
}

Mute.prototype = {
  participants: function(){ return gapi.hangout.getParticipants();},
  mute: function(){
    _.each(this.participants, function(participant){
      if(participant != this.me){
        gapi.hangout.av.muteParticipantMicrophone(participant.id);
      }
    });
  },
  push_to_talk: function(){
    var self = this;
    $('a.push_to_talk').click(function(){
      self.push_to_talk = true;
      $('button.push_to_talk').text('push to talk');
    });
    $('a.push_to_mute').click(function(){
      self.push_to_talk = false;
      $('button.push_to_talk').text('push to talk');
    });
    $('button.push_to_talk').mousedown(function(){
      gapi.hangout.av.setMicrophoneMute(!push_to_talk);
    });
    $('button.push_to_talk').mouseup(function(){
      gapi.hangout.av.setMicrophoneMute(push_to_talk);
    });
  }
};

function init() {
  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      var mute = new Mute();
    }
  };
  gapi.hangout.onApiReady.add(apiReady);
}
gadgets.util.registerOnLoadHandler(init);
