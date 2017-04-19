//Creating setSong function taking the argument songNumber
//Assigns currentlyPlayingSongNumber and currentSongFromAlbum a new value
//based on the new song number
var setSong = function(songNumber){
    currentPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

//Difference between these two functions is the parseInt use in the first function

//The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).

//Creating setSong function taking the argument songNumber
//Assigns currentlyPlayingSongNumber and currentSongFromAlbum a new value
//based on the new song number
var setSong = function(songNumber) {
  currentlyPlayingSongNumber = songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};


//Creatiing a function named getSongNumberCell here
//taking one argument number
//retuning the song number element that corresponds to that song number
var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]')
};

//Creating a function createSongRow taking arguments songNumber, songName, songLength
var createSongRow = function(songNumber, songName, songLength) {
  var template = 
      '<tr class="album-view-song-item">'
        + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '<td class="song-item-title">' + songName + '</td>'
        + '<td class="song-item-duration">' + songLength + '</td>'
      +'</tr>'
  ;
    
  var $row = $(template);
  
    
    //handler
    //Type: Function( Event eventObject )
    //A function to execute each time the event is triggered.
    var clickHandler = function() {
    
    var songItemNumber = $(this).attr('data-song-number');
    
    //Replace all instance with getSongNumberCell call
    if (currentlyPlayingSongNumber !== null) {
      var whatSongIsPlaying = getSongNumberCell(currentlyPlayingSongNumber);
      whatSongIsPlaying.html(currentlyPlayingSongNumber);
     }
    
    
    if (currentlyPlayingSongNumber !== songItemNumber) {
      $(this).html(pauseButtonTemplate);
      setSong(songItemNumber);
      updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber === songItemNumber) {
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      setSong(null);
    }
  };
  
  //function event for when user hover and plays a song
  var onHover = function(event) {
    var songNumberElement = $(this).find('.song-item-number');
    var songNumber = songNumberElement.attr('data-song-number');
    
    if(songNumber !== currentlyPlayingSongNumber) {
      songNumberElement.html(playButtonTemplate);
    }
  };
  
  var offHover = function(event) {
    var songNumberElement = $(this).find('.song-item-number');
    var songNumber = songNumberElement.attr('data-song-number');
    
    if(songNumber !== currentlyPlayingSongNumber) {
      songNumberElement.html(songNumber);
    }
  };
  
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  
  return $row;
};

var setCurrentAlbum = function(album) {
  
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo= $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.text('src', album.albumArtUrl);
  
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration)
      $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {
  $('.main-controls .play-pause').html(playerBarPauseButton);
  $('.song-name').text(currentSongFromAlbum.title);
  $('.artist-song-mobile').text(currentAlbum.songs[currentlyPlayingSongNumber - 1].title + " - " + currentAlbum.artist);
  $('.artist-name').text(currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    //Replace all instance with getSongNumberCell call
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});