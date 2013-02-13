Hangout = {
  me: function(){ return gapi.hangout.getLocalParticipant();},
  
  participants: function(){ return gapi.hangout.getParticipants();},
  
  mute: function(participant){
    if(_.isEmpty(arguments)){
      participant = Hangout.me();
      Hangout.muted = true;
      Hangout.mute_overlay = Hangout.mute_icon_image_resource.showOverlay({position:{x:-0.44, y:0.4}, scale: {magnitude: 0.1, reference: "frame_width"}});
    }
    gapi.hangout.av.muteParticipantMicrophone(participant.id);
  },
  
  talk: function(){
    Hangout.muted = false;
    Hangout.mute_overlay.setVisible(false);
    gapi.hangout.av.setMicrophoneMute(false);
  },
  
  get_my_mute_state: function(){
    return gapi.hangout.av.getMicrophoneMute();
  },

  mute_everyone: function(){
    _.each(Hangout.participants(), function(participant){
      if( participant != Hangout.me() ){
        Hangout.mute(participant);
      }
    });
  },
  
  push_to_talk: function(){
    if(Hangout.muted){
      Hangout.talk();
    }
    else{
      Hangout.mute();
    }
  },

  mute_icon_image_resource: gapi.hangout.av.effects.createImageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODIyQTg5Q0Q0N0Q4NUQ5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QzEzNTg4NDZFMzcxMUUyQUIwMUU0Nzg0MUYyMTQyMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QzEzNTg4MzZFMzcxMUUyQUIwMUU0Nzg0MUYyMTQyMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEE4MDExNzQwNzIwNjgxMTgyMkE4OUNENDdEODVEOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgyMkE4OUNENDdEODVEOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4uK6hrAAABMUlEQVR42oRSy27CMBDcRbm3EhKpcuFK/qT8Ad/Ap/EN/Ealiqqn9MTj0AMccJypd72OXVKpkRDGzMzOzIax2ZA9TAT676ngBxBY0AEeCMwMCJGTAMKVnQiV930Up6Qf8AqmQc7y35AMyIShd2mAcbj8fjxT5XtPQA6hXIDVE5BDcSLc7zGt+ByJZhFZRT9BqPLOTZr4VVcRT+6VgAxTL9FVLMdGq1XpquqDpYkYT4YiXWsGolnb4nLB8SRBqXCk4cPPWbtSwJG7dkX1y/Nuh9vte70uNG0bwqjrJwO8hgw9us6fz7hetbG4VEFDjUiS7ssAzvHncilR8eBYcbEFNZ/mMX80DVLM5nD484U7bbduvzd774tFLiHbtjFRqyyN3+bztBWMGwNZ7cC4eRP7EWAAGwe3rVBLob4AAAAASUVORK5CYII=")

};

Mute = {
  init: function(){
    Hangout.muted = Hangout.get_my_mute_state();
    Mute.bind_mute_everyone();
    Mute.bind_push_to_talk();
  },

  icon: function(icon){
    return "<i class='icon-" + icon + "'></i>";
  },



  bind_mute_everyone: function(){
    $('button.mute').click(function(){ 
      Hangout.mute_everyone();
    });
  },

  bind_push_to_talk: function(){
    Mute.bind_settings_dropdown();
    $('button.push_to_talk').bind('mouseup mousedown', function(){
      console.log('mouse')
      Hangout.push_to_talk();
      $(this).toggleClass('btn-danger');
    });

    $("body").keydown(function(event) {
      if ( event.which == 77 && !Mute.pressed) {
          Mute.pressed = true;
          Hangout.push_to_talk();
          $('button.push_to_talk').toggleClass('btn-danger');
      }
    });
    $("body").keyup(function(event) {
      if ( event.which == 77 && Mute.pressed) {
        Mute.pressed = false;
        Hangout.push_to_talk();
        $('button.push_to_talk').toggleClass('btn-danger');

      }
    });
  },



  bind_settings_dropdown: function(){
    $('a.push_to_mute').hide();
    $('a.push_to_talk').click(function(){
      Hangout.mute();
      $('a.push_to_talk, a.push_to_mute').toggle();
      $('button.push_to_talk').html(Mute.icon('bullhorn') + 'push to talk').addClass('btn-danger');
    });
    $('a.push_to_mute').click(function(){
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
