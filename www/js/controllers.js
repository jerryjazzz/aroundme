angular.module('starter.controllers', ['starter.services','jett.ionic.filter.bar','ngCordova','ngGPlaces'])

.controller('MenuController', function($cordovaGeolocation, $scope, $state, PlaceTypeService, StaticMapService) {

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

	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
		var coords = pos.coords.latitude + ',' + pos.coords.longitude;	
		$scope.map = StaticMapService.getCurrentLocationOnly(coords);

    }, function (error) {
		alert('Unable to get location: ' + error.message);
    });

})

.controller('PlacesController', function($cordovaGeolocation, $ionicFilterBar, $ionicLoading, 
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
				console.log(data);

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
	$scope, $stateParams, ngGPlacesAPI) {

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

	ngGPlacesAPI.placeDetails({placeId: $stateParams.placeId}).then(function (data) {
		console.log(data);

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
});