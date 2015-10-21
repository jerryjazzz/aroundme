angular.module('starter.controllers', ['starter.services','jett.ionic.filter.bar','ngCordova'])

.controller('PlacesController', function($cordovaGeolocation, $ionicFilterBar, $ionicLoading, 
	$ionicPlatform, $scope, PlacesService) {

	$scope.init = function() {
		$ionicLoading.show({
	      content: 'Getting current location...',
	      showBackdrop: false
	    });
	    
    	var posOptions = {
       		enableHighAccuracy: true,
        	timeout: 20000,
        	maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
			var coords = pos.coords.latitude + ',' + pos.coords.longitude;
	      	console.log('Got pos', coords);
			
			// Sample coordinates : "-33.8670522,151.1957362"
			PlacesService.getPlaces(coords).then(function(places){
				console.log(places);

				for(var x=0; x<places.length; x++){
					if(places[x].opening_hours && places[x].opening_hours.open_now){
						places[x].open = true;
					} else {
						places[x].open = false;
					}
				}

				$scope.places = places;
			});
	    }, function (error) {
	      alert('Unable to get location: ' + error.message);
	    });
	    $ionicLoading.hide();
	};

	$scope.refresh = function() {
		$scope.init();

		//Stop the ion-refresher from spinning
		$scope.$broadcast('scroll.refreshComplete');
	};

	$scope.showFilterBar = function(){
		$ionicFilterBar.show({
			items: $scope.places,
			update: function(filteredData) {
				$scope.places = filteredData;
			},
			filterProperties: $scope.places.name
		});
	};

    $ionicPlatform.ready(function() {
		$scope.init();
	});
})

.controller('PlaceController', function($cordovaGeolocation, $cordovaSocialSharing, $ionicSlideBoxDelegate, 
	$scope, $stateParams, PlacesService) {

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
					$scope.place.geometry.location.lat + "," + 
					$scope.place.geometry.location.lng + "&dirflg=d";

				window.open(url, '_system', 'location=yes'); 

				return false;
	    }, function (error) {
	      alert('Unable to get location: ' + error.message);
	    });
	};

	$scope.share = function() {
		// var url = "http://maps.google.com/maps?z=18&q=" + 
		// 	$scope.place.geometry.location.lat + "," + 
		// 	$scope.place.geometry.location.lng;

		var url = "http://maps.google.com/?ll=39.774769,-74.86084";
		
        $cordovaSocialSharing.share(null, null, null, url);
	};

	PlacesService.getPlace($stateParams.placeId).then(function(place){
		console.log(place);
		
		if(place.photos){
			$scope.hasPhotos = true;

			for(var x=0;x<place.photos.length; x++) {
				place.photos[x].url = PlacesService.getPhoto(place.photos[x].photo_reference);
			}
			
		}

		if(place.opening_hours && place.opening_hours.open_now){
			place.open = true;
		} else {
			place.open = false;
		}

		$ionicSlideBoxDelegate.update();
		
		$scope.place = place;	

	});


});