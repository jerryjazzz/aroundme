angular.module('starter.services', [])

.factory('PlacesService', function ($http) {
	var API_KEY = "AIzaSyAvFX8nLPbEk3f9Fe5CRcy0SuIy4ghoXo0";
	var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
	var placeDetailURL = "https://maps.googleapis.com/maps/api/place/details/json?";
	var photoURL = "https://maps.googleapis.com/maps/api/place/photo?";

	// "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRdAAAAF7_1Sj095gDjTT0bYLyqk41lc5IIhJywwAlk3ryq7r0qX3839rU-JrN8CIKLwxTv52kxO6Y4JJbzVaRHgz1KFUKQ41EjgA9jH2qrh8VA0P0TGjl5HiecKkdSGISk-zlSEhB0XZC98Xd5XOP23qYgwivAGhSruqDpdN8jeapy72lIkUfBWT49OQ&key=AIzaSyAvFX8nLPbEk3f9Fe5CRcy0SuIy4ghoXo0"

	return {
		getPlaces: function(coords){
			return $http.get(placesURL, 
				{ params: { 
						"location": coords, 
						"radius": "1000",
						"types": ["food"],
						"key": API_KEY, 
					} 
				}).then(function(response){
					if (response.data.status == 'OK'){
						return response.data.results;
					}
					return [];
				});
		},
		getPlace: function(placeId) {
			return $http.get(placeDetailURL, 
				{ params: { 
						"placeid": placeId, 
						"key": API_KEY,
					} 
				}).then(function(response){
					if (response.data.status == 'OK'){
						return response.data.result;
					}
					return [];
				});
		},
		getPhoto: function(reference) {
			return photoURL + 'maxwidth=400' + '&photoreference=' + reference + '&key=' + API_KEY;
		}
	}
});