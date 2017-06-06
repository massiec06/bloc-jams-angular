(function() {
     /**
     *@function SongPlayer
     *@desc Plays, pauses, and changes songs on album's page
     *@param {Object}
     **/

     function SongPlayer(Fixtures) {
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */

          var currentBuzzObject = null;

          /**
          *@function playSong
          *@desc Sets current Buzz object to play and song playing to true
          *@param {Object} song
          **/

          var playSong = function(song) {
              currentBuzzObject.play();
              song.playing = true;
          }

          /**
          *@function stopSong
          *@desc Sets current Buzz object to stop and song playing to null
          *@param {Object} song
          **/

          var stopSong = function(song) {

              currentBuzzObject.stop();
              song.playing = null;
          }

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */

          var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };

         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         *@function SongPlayer.play
         *@desc Sets the song to play if current song is not set to a song else if current song is set to song checks if paused before setting Buzz Object to play
         *@param {Object} song
         **/

          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
              }
          };

         /**
         *@function SongPlayer.pause
         *@desc pauses current audio file and sets song playing to false
         *@param {Object} song
         **/

         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        *@function SongPlayer.previous
        *@desc Changes to previous song from player bar
        *@param {Object} song
        **/

        SongPlayer.previous = function() {
           var currentSongIndex = getSongIndex(SongPlayer.currentSong);
           currentSongIndex--;

           if (currentSongIndex < 0) {
             stopSong(SongPlayer.currentSong);
           } else {
               var song = currentAlbum.songs[currentSongIndex];
               setSong(song);
               playSong(song);
           }
        };

        /**
        *@function SongPlayer.next
        *@desc Changes to next song from player bar
        *@param {Object} song
        **/

        SongPlayer.next = function () {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex > currentAlbum.length) {
              stopSong(SongPlayer.currentSong);
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
