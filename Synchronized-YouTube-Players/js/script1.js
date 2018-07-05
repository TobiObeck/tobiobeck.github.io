   /* // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);*/

$(function() {
    console.log( "ready!" );


    function onPlayerReady(event) {  
      // bind events
      var playButton = document.getElementById("playBtn");
      playButton.addEventListener("click", function() {
        console.log('play');
        player.playVideo();
      });
      
      var pauseButton = document.getElementById("pauseBtn");
      pauseButton.addEventListener("click", function() {
        console.log('pause');
        player.pauseVideo();
      });      
    }
    
    var player;

    function onYouTubePlayerAPIReady() {
      // create the global player from the specific iframe (#video)
      player = new YT.Player('video', {
        events: {
          // call this function when player is ready to use
          'onReady': onPlayerReady
        }
      });
    }
});

