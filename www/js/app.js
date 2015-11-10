angular.module('starter', ['ionic','starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var admobid = {};
    // select the right Ad Id according to platform
    if( /(android)/i.test(navigator.userAgent) ) { 
        admobid = { // for Android
            banner: 'ca-app-pub-2787085904720807/7587638979',
            interstitial: 'ca-app-pub-2787085904720807/7587638979'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
            banner: 'ca-app-pub-2787085904720807/7587638979',
            interstitial: 'ca-app-pub-2787085904720807/7587638979'
        };
    } else {
        admobid = { // for Windows Phone
            banner: 'ca-app-pub-2787085904720807/7587638979',
            interstitial: 'ca-app-pub-2787085904720807/7587638979'
        };
    }
 
    if(window.AdMob) AdMob.createBanner( {
        adId:admobid.banner, 
        position:AdMob.AD_POSITION.BOTTOM_CENTER, 
        autoShow:true} );

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
    $urlRouterProvider.otherwise('/menu');
});
