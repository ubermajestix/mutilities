Hangout = {
  me: function(){ return gapi.hangout.getLocalParticipant();},
  participants: function(){ return gapi.hangout.getParticipants();},
  mute: function(participant){
    if(_.isEmpty(arguments)){
      participant = Hangout.me();
    }
    gapi.hangout.av.muteParticipantMicrophone(participant.id);
  },
  talk: function(){
    gapi.hangout.av.setMicrophoneMute(false);
  }
};

Mute = {
  init: function(){
    Mute.push_to_talk_state = false;
    Mute.bind_mute_everyone();
    Mute.bind_push_to_talk();
  },

  icon: function(icon){
    return "<i class='icon-" + icon + "'></i>";
  },

  bind_mute_everyone: function(){
    $('button.mute').click(function(){ 
      Mute.mute_everyone();
    });
  },

  mute_everyone: function(){
    _.each(Hangout.participants(), function(participant){
      if(participant != Mute.me){
        Hangout.mute(participant);
      }
    });
  },

  bind_push_to_talk: function(){
    Mute.bind_settings_dropdown();
    $('button.push_to_talk').bind('mouseup mousedown', function(){
      Mute.push_to_talk();
      $(this).toggleClass('btn-danger');
    });

    $("body").keydown(function(event) {
      if ( event.which == 77 && !Mute.pressed) {
          Mute.pressed = true;
          Mute.push_to_talk();
          $('button.push_to_talk').toggleClass('btn-danger');
      }
    });
    $("body").keyup(function(event) {
      if ( event.which == 77 && Mute.pressed) {
        Mute.pressed = false;
        Mute.push_to_talk();
        $('button.push_to_talk').toggleClass('btn-danger');
      }
    });
  },

  push_to_talk: function(){
    if(Mute.push_to_talk_state){
      Hangout.talk();
    }
    else{
      Hangout.mute();
    }
    Mute.push_to_talk_state = !Mute.push_to_talk_state;
  },

  push_to_mute: function(){
    if(Mute.push_to_talk_state){
      Hangout.mute();
    }
    else{
      Hangout.talk();
    }
    Mute.push_to_talk_state = !Mute.push_to_talk_state;
  },

  bind_settings_dropdown: function(){
    $('a.push_to_mute').hide();
    $('a.push_to_talk').click(function(){
      Mute.push_to_talk_state = true;
      Hangout.mute();
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(Mute.icon('bullhorn') + 'push to talk').addClass('btn-danger');
    });
    $('a.push_to_mute').click(function(){
      Mute.push_to_talk_state = false;
      Hangout.talk();
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(Mute.icon('ban-circle') + 'push to mute').removeClass('btn-danger');
    });
  }
};

function init() {
  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      Mute.init();
    }
  };
  gapi.hangout.onApiReady.add(apiReady);
}
gadgets.util.registerOnLoadHandler(init);
