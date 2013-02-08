 Mute = function(){
  var self = this;
  this.me = gapi.hangout.getLocalParticipant();
  $('button.mute').click(function(){ 
    self.mute();
  });
  this.push_to_talk();
};

Mute.prototype = {
  icon: function(icon){
    return "<i class='icon-" + icon + "'></i>";
  },
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
    var push_to_talk = false;
    $('a.push_to_mute').hide();
    $('a.push_to_talk').click(function(){
      console.log('talk');
      push_to_talk = true;
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(self.icon('bullhorn') + 'push to talk').addClass('btn-danger');
    });
    $('a.push_to_mute').click(function(){
      console.log('mute');
      push_to_talk = false;
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(self.icon('ban-circle') + 'push to mute');
    });
    $('button.push_to_talk').mousedown(function(){
      if(push_to_talk){
        $(this).removeClass('btn-danger');
      }
      else{
        $(this).addClass('btn-danger');
      }
      gapi.hangout.av.setMicrophoneMute(!push_to_talk);
    });
    $('button.push_to_talk').mouseup(function(){
      if(push_to_talk){
        $(this).addClass('btn-danger');
      }
      else{
        $(this).removeClass('btn-danger');
      }
      gapi.hangout.av.setMicrophoneMute(push_to_talk);
    });
    $("body").keydown(function(event) {
      console.log(event.which);
      if ( event.which == 77 ) {
        gapi.hangout.av.setMicrophoneMute(!push_to_talk);
      }
    });
    $("body").keyup(function(event) {
      console.log(event.which);
      if ( event.which == 77 ) {
        gapi.hangout.av.setMicrophoneMute(push_to_talk);
      }
    });
  }
};

function init() {
  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      var mute = new Mute();
      console.log(mute);
    }
  };
  gapi.hangout.onApiReady.add(apiReady);
}
gadgets.util.registerOnLoadHandler(init);
