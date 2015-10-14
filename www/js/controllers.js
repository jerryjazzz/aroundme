angular.module('starter.controllers', ['starter.services'])

.controller('PlacesController', function($ionicLoading, $scope, PlacesService) {

	$ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {

		var coords = pos.coords.latitude + ',' + pos.coords.longitude;
      	console.log('Got pos', coords);
		
		// Sample coordinates : "-33.8670522,151.1957362"
		PlacesService.getPlaces(coords).then(function(places){
			console.log(places);
			$scope.places = places;
		});

      	$ionicLoading.hide();

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });

})

.controller('PlaceController', function($ionicSlideBoxDelegate, $scope, $stateParams, PlacesService) {
	PlacesService.getPlace($stateParams.placeId).then(function(place){
		console.log(place);
		
		if(place.photos){
			$scope.hasPhotos = true;

			for(var x=0;x<place.photos.length; x++) {
				place.photos[x].url = PlacesService.getPhoto(place.photos[x].photo_reference);
			}
			
		}
		$ionicSlideBoxDelegate.update();
		
		$scope.place = place;	

	});
});