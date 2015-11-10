angular.module('starter.services', [])

.factory('StaticMapService', function() {
	var API_KEY = "AIzaSyAvFX8nLPbEk3f9Fe5CRcy0SuIy4ghoXo0";
	var staticMapURL = "https://maps.googleapis.com/maps/api/staticmap?"

	var zoom = "&zoom=15";
	var size = "&size=300x180";
	var scale = "&scale=2";

	return {
		getCurrentLocationOnly: function(coords) {
			// var coords = "40.7127,-74.0059";
			return staticMapURL + "center=" + coords + zoom + size + scale + "&markers=" + coords + '&' + API_KEY;
		}
	}
})

.factory('PlaceTypeService', function() {
  var placeType = this;
  placeType.sharedObject = {};

  return {
	  getPlaceType: function(){
	     return placeType.sharedObject.type;
	  },
	  setPlaceType: function(value){
	     placeType.sharedObject.type = value;
	  }
  }
});

// .factory('PlacesService', function ($http) {
// 	var API_KEY = "AIzaSyAvFX8nLPbEk3f9Fe5CRcy0SuIy4ghoXo0";
// 	var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
// 	var placeDetailURL = "https://maps.googleapis.com/maps/api/place/details/json?";
// 	var photoURL = "https://maps.googleapis.com/maps/api/place/photo?";

// 	return {
// 		getPlaces: function(coords,type){
// 			return $http.get(placesURL, 
// 				{ params: { 
// 						"location": coords, 
// 						"radius": "1000",
// 						"types": type,
// 						"key": API_KEY,
// 					} 
// 				}).then(function(response){

// 					// console.log(response);

// 					if (response.data.status == 'OK'){
// 						return response.data.results;
// 					}
// 					return [];
// 				});
// 		},
// 		getPlace: function(placeId) {
// 			return $http.get(placeDetailURL, 
// 				{ params: { 
// 						"placeid": placeId, 
// 						"key": API_KEY,
// 					} 
// 				}).then(function(response){
// 					if (response.data.status == 'OK'){
// 						return response.data.result;
// 					}
// 					return [];
// 				});
// 		},
// 		getPhoto: function(reference) {
// 			return photoURL + 'maxwidth=400' + '&photoreference=' + reference + '&key=' + API_KEY;
// 		}
// 	}
// });