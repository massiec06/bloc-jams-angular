(function() {
     /**
     *@function SongPlayer
     *@desc Plays, pauses, and changes songs on album's page
     *@param {Object}
     **/

     function SongPlayer() {
          var SongPlayer = {};


          var currentSong = null;

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
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */

          var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };

         /**
         *@function SongPlayer.play
         *@desc Sets the song to play if current song is not set to a song else if current song is set to song checks if paused before setting Buzz Object to play
         *@param {Object} song
         **/

          SongPlayer.play = function(song) {
              if (currentSong !== song) {
                setSong(song);
                playSong(song);
              } else if (currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
              }
          };

         /**
         *@function SongPlayer.pause
         *@desc pauses current audio file and sets song playing to false
         *@param {Object} song
         **/
         
         SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
