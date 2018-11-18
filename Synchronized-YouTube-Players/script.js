var player;
var player2;

var time_update_interval = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder1', {
        width: 600,
        height: 400,
        videoId: '0J2QdDbelmY',
        playerVars: {
            color: 'white'
            //playlist: 'Xa0Q0J5tOP0,taJ60kskkns'
        },
        events: {
            onReady: initialize
        }
    });
    player2 = new YT.Player('video-placeholder2', {
        width: 600,
        height: 400,
        videoId: 'qeMFqkcPYcg',
        playerVars: {
            color: 'white',
            playlist: 'FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });    
}

function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000);


    $('#volume-input').val(Math.round(player.getVolume()));
    $('#volume-input2').val(Math.round(player2.getVolume()));
}


// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#current-time2').text(formatTime( player2.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
    $('#duration').text(formatTime( player2.getDuration() ));
}


// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
    $('#progress-bar2').val((player2.getCurrentTime() / player2.getDuration()) * 100);    
}


// Progress bar

$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);    
});

$('#progress-bar2').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player2.seekTo(newTime);    
});

$('#plus').click(function(e){
    scrollOneStep1(e, 0.5);
});
$('#plus2').click(function(e){
    scrollOneStep2(e, -0.5);
});
$('#minus').click(function(e){
    scrollOneStep1(e, 0.5);
});
$('#minus2').click(function(e){
    scrollOneStep2(e, -0.5);    
});

var counter = 0;

function scrollOneStep1(e, value){
    var newTime = player.getDuration() * ($('#progress-bar').val() / 100) + value;
    console.log(newTime);
    console.log(newTime/60, newTime % 60);
    player.seekTo(newTime);   
}

function scrollOneStep2(e, value){    
    var newTime = player2.getDuration() * ($('#progress-bar2').val() / 100) + value;
    console.log(newTime);
    console.log(newTime/60, newTime % 60);
    player2.seekTo(newTime);   
}


// Playback
$('#play').on('click', function () {
    player.playVideo();
    player2.playVideo();
});

$('#pause').on('click', function () {
    player.pauseVideo();
    player2.pauseVideo();
});


// Sound volume
$('#mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if(player.isMuted()){
        player.unMute();
        player2.unMute();
        mute_toggle.text('volume_up');
    }
    else{
        player.mute();
        player2.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function () {
    player.setVolume($(this).val());
    player2.setVolume($(this).val());
});


// Other options


$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
    player2.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
    player2.setPlaybackQuality($(this).val());
});


// Playlist

$('#next').on('click', function () {
    player.nextVideo()
    player2.nextVideo()
});

$('#prev').on('click', function () {
    player.previousVideo()
    player2.previousVideo()
});


// Load video

$('.thumbnail').on('click', function () {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);
    player2.cueVideoById(url);
});


// Helper Functions

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}