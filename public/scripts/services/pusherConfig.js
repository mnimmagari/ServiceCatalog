'use strict';
//defining pusher notification
angular.module('pusherConfig', [])

.config(['PusherServiceProvider',
  function(PusherServiceProvider) {
    PusherServiceProvider
    .setToken('f94fd23ad6b4756b5862')
    .setOptions({});
  }
]);