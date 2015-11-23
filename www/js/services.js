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