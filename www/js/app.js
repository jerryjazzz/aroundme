angular.module('starter', ['ionic','starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // // Google Analytics
    // if(typeof analytics !== undefined){
    //     analytics.startTrackerWithId('UA-66786839-1');
    //     analytics.trackView("category");
    // } else {
    //     alert('Google Analytics unavailable');
    // }

    // App Rate
    AppRate.preferences.useLanguage = 'en';

    var popupInfo = {};
    popupInfo.title = "Rate Us Now";
    popupInfo.message = "Do you like this app? Please take some time to rate us.";
    popupInfo.cancelButtonLabel = "No, thanks";
    popupInfo.laterButtonLabel = "Remind me later";
    popupInfo.rateButtonLabel = "Rate now";
    AppRate.preferences.customLocale = popupInfo;

    AppRate.preferences.openStoreInApp = true;

    AppRate.preferences.storeAppURL.android = 'market://details?id=com.ionic.aroundme';

    AppRate.preferences.usesUntilPrompt = 10;
    AppRate.promptForRating();


  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('category', {
            url:'/category',
            templateUrl: 'templates/category.html',
            controller: "CategoryController"
        })
        .state('menu_entertainment', {
            url:'/menu_entertainment',
            templateUrl: 'templates/menu_entertainment.html',
            controller: "MenuController"
        })
        .state('menu_finance', {
            url:'/menu_finance',
            templateUrl: 'templates/menu_finance.html',
            controller: "MenuController"
        })
        .state('menu_food_drink', {
            url:'/menu_food_drink',
            templateUrl: 'templates/menu_food_drink.html',
            controller: "MenuController"
        })
        .state('menu_shopping', {
            url:'/menu_shopping',
            templateUrl: 'templates/menu_shopping.html',
            controller: "MenuController"
        })
        .state('menu_tourism', {
            url:'/menu_tourism',
            templateUrl: 'templates/menu_tourism.html',
            controller: "MenuController"
        })
        .state('menu_transportation', {
            url:'/menu_transportation',
            templateUrl: 'templates/menu_transportation.html',
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
    $urlRouterProvider.otherwise('/category');
});
