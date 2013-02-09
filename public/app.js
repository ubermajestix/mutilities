Hangout = {
  me: function(){gapi.hangout.getLocalParticipant();},
  participants: function(){ return gapi.hangout.getParticipants();},
  mute: function(participant){
    if(_.isEmpty(arguments)){
      participant = Hangout.me;
    }
    gapi.hangout.av.muteParticipantMicrophone(participant.id);
  },
  talk: function(){
    gapi.hangout.av.setMicrophoneMute(false);
  }
};

Mute = {
  init: function(){
    console.log('init');
    Mute.push_to_talk_state = false;
    Mute.bind_mute_everyone();
    Mute.bind_push_to_talk();
  },

  icon: function(icon){
    return "<i class='icon-" + icon + "'></i>";
  },

  bind_mute_everyone: function(){
    $('button.mute').click(function(){ 
      self.mute_everyone();
    });
  },

  mute_everyone: function(){
    _.each(Mute.participants(), function(participant){
      if(participant != Mute.me){
        Mute.mute(participant);
      }
    });
  },

  bind_push_to_talk: function(){
    console.log('bind_push_to_talk');
    Mute.bind_settings_dropdown();
    $('button.push_to_talk').mousedown(function(){
      Mute.push_to_talk();
      $(this).toggleClass('btn-danger');
    });
    $('button.push_to_talk').mouseup(function(){
      Mute.push_to_mute();
      $(this).toggleClass('btn-danger');
    });
    $("body").keydown(function(event) {
      if ( event.which == 77 ) {
        Mute.push_to_talk();
        $(this).toggleClass('btn-danger');
      }
    });
    $("body").keyup(function(event) {
      if ( event.which == 77 ) {
        Mute.push_to_mute();
        $(this).toggleClass('btn-danger');
      }
    });
  },

  push_to_talk: function(){
    Mute.push_to_talk_state ? Hangout.talk() : Hangout.mute();
  },

  push_to_mute: function(){
    Mute.push_to_talk_state ? Hangout.mute() : Hangout.talk();
  },

  bind_settings_dropdown: function(){
    $('a.push_to_mute').hide();
    $('a.push_to_talk').click(function(){
      Mute.push_to_talk_state = true;
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(self.icon('bullhorn') + 'push to talk').addClass('btn-danger');
    });
    $('a.push_to_mute').click(function(){
      Mute.push_to_talk_state = false;
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(self.icon('ban-circle') + 'push to mute');
    });
  }
};

function init() {
  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      console.log('ready');
      Mute.init();
    }
  };
  gapi.hangout.onApiReady.add(apiReady);
}
gadgets.util.registerOnLoadHandler(init);
