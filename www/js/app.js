angular.module('starter', ['ionic','starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('menu', {
            url:'/menu',
            templateUrl: 'templates/menu.html',
            controller: "MenuController"
        })
        .state('places', {
            url: '/places',
            templateUrl: 'templates/places.html',
            controller: 'PlacesController'
        })
        .state('place', {
            url: "/places/:placeId",
            templateUrl: "templates/place.html",
            controller: "PlaceController"
        });
    // $urlRouterProvider.otherwise('/places');
    $urlRouterProvider.otherwise('/menu');
});
