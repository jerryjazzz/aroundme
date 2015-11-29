angular.module('starter.controllers', ['starter.services','ngCordova','ngGPlaces'])

.controller('CategoryController', function($scope) {

})

.controller('MenuController', function($cordovaGeolocation, $ionicPlatform, $scope, $state, PlaceTypeService, StaticMapService) {

	var messages = [
		"May your life be filled with joy and happiness and may each new day bring you moments to cherish.",
		"On this joyous day, and throughout the new year, may your life be filled with an abundance of love.",
		"Merry Christmas and may you live a long and happy life filled with goodwill and friendship.",
		"May this new year bring you peace and tranquility, and as you walk your path may it bring you contentment.",
		"On this joyous day, and throughout the coming year, may your life be filled with good luck and prosperity.",
		"May your heart be filled with the joy of giving, as it is the expression of the love in your heart and the kindness in your soul.",
		"May the light of love shine upon you, and may your life be filled with blessings in this Christmas season.",
		"On this most blessed day, I wish you love for all your kindness, and I hope the new year will bring you many days of happiness."
	];

	$scope.message = function() {
		var index =	Math.round(Math.random()*7);
		navigator.notification.alert(messages[index], null,"Merry Xmas", "Thanks");
	};

	$scope.openPage = function (type){
		// console.log(type);
		PlaceTypeService.setPlaceType(type);
		$state.go('places');
	};

	var posOptions = {
   		enableHighAccuracy: true,
    	timeout: 20000,
    	maximumAge: 0
    };

    $ionicPlatform.ready(function() {
    	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
			var coords = pos.coords.latitude + ',' + pos.coords.longitude;	
			$scope.map = StaticMapService.getCurrentLocationOnly(coords);
	    }, function (error) {
			alert('Unable to get location: ' + error.message);
	    });
	});
})

.controller('PlacesController', function($cordovaGeolocation, $ionicLoading, 
	$ionicPlatform, $scope, PlaceTypeService, ngGPlacesAPI) {

	$ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });


	$scope.init = function() {

		$ionicLoading.show({
	      content: 'Getting current location...',
	      showBackdrop: false
	    });

		// console.log(PlaceTypeService.getPlaceType());

		var placeType = PlaceTypeService.getPlaceType();

		if(!placeType)
			placeType="";
	    
    	var posOptions = {
       		enableHighAccuracy: true,
        	timeout: 20000,
        	maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {

        	var configs = {
        		types:[placeType],
				radius:1000,
				latitude:pos.coords.latitude, 
        	 	longitude:pos.coords.longitude,
        	};

        	ngGPlacesAPI.nearbySearch(configs).then(function(data){
				// console.log(data);

				for(var x=0; x<data.length; x++){
					if(data[x].opening_hours && data[x].opening_hours.open_now){
						data[x].open = true;
					} else {
						data[x].open = false;
					}
				}

				$scope.places = data;

				$ionicLoading.hide();

			}, function (error){
				$ionicLoading.hide();
				alert(error);
			});

	    }, function (error) {
		    $ionicLoading.hide();
	      	alert('Unable to get location: ' + error.message);
	    });
	};

	$scope.refresh = function() {
		$scope.init();

		//Stop the ion-refresher from spinning
		$scope.$broadcast('scroll.refreshComplete');
	};

    $ionicPlatform.ready(function() {
		$scope.init();
	});
})

.controller('PlaceController', function($cordovaGeolocation, $cordovaSocialSharing, $ionicSlideBoxDelegate, 
	$ionicPlatform, $scope, $stateParams, ngGPlacesAPI) {

	$scope.navigate = function() {
		var posOptions = {
	   		enableHighAccuracy: true,
	    	timeout: 20000,
	    	maximumAge: 0
	    };

	    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
				$scope.lat = pos.coords.latitude;
				$scope.lng = pos.coords.longitude;

				var url = "http://maps.google.com/maps?saddr=" + 
					pos.coords.latitude + "," +
					pos.coords.longitude + "&daddr=" + 
					$scope.place.geometry.location.lat() + "," + 
					$scope.place.geometry.location.lng() + "&dirflg=d";

				window.open(url, '_system', 'location=yes'); 

				return false;
	    }, function (error) {
	      alert('Unable to get location: ' + error.message);
	    });
	};

	$scope.share = function() {
		var url = "http://maps.google.com/maps?z=18&q=" + 
			$scope.place.geometry.location.lat() + "," + 
			$scope.place.geometry.location.lng();

		// var url = "http://maps.google.com/?ll=39.774769,-74.86084";
		
        $cordovaSocialSharing.share(null, null, null, url);
	};

	$scope.openUrl = function(url) {
		window.open(url, '_system', 'location=yes'); 
		return false;
	};

    $ionicPlatform.ready(function() {
		ngGPlacesAPI.placeDetails({placeId: $stateParams.placeId}).then(function (data) {
			// console.log(data);

			if(data.photos){
				$scope.hasPhotos = true;

				for(var x=0;x<data.photos.length; x++) {
					data.photos[x].url = data.photos[x].getUrl({maxWidth:"350",maxHeight:"250"});
				}
				
			}

			if(data.opening_hours && data.opening_hours.open_now){
				data.open = true;
			} else {
				data.open = false;
			}

			$ionicSlideBoxDelegate.update();

			$scope.place = data;

		});

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
});