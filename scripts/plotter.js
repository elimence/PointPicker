var poly;
var map;
var start=0;
var end=0;
var count;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();



function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var Accra = new google.maps.LatLng(5.539445648546757, -0.2032470703125);

  var mapOptions = {
    zoom: 8,
    center: Accra,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // var polyOptions = {
  //   strokeColor: '#000000',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 3
  // }
  // poly = new google.maps.Polyline(polyOptions);
  // poly.setMap(map);

  // Add a listener for the click event
  // google.maps.event.addListener(map, 'click', addLatLng);
  google.maps.event.addListener(map, 'click', call);
  directionsDisplay.setMap(map);

} // end initialize

function call(event) {
  if (start == 0) {
    start=event.latLng;
  } else {
    end=event.latLng;
    calcRoute3(start,end);
    start=0;
    end=0;
  }
}

function calcRoute1() {
  var request = {
      origin:"5.859206805186902, -0.361175537109375",
      destination:"5.788164240722203, 0.127716064453125",
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      window.console.log(response.routes[0].overview_polyline.points);
      // directionsDisplay.setDirections(response);
      addLatLng(response.routes[0].overview_polyline.points)

      var polyOptions = {
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        paths: response.routes[0].overview_polyline.points
      }
      poly = new google.maps.Polyline(polyOptions);
      poly.setMap(map);

    }
  });
}




function calcRoute() {
  var request = {
  origin:"5.57579493204022, -0.18816232681274414",
  destination:"5.788164240722203, 0.127716064453125",
  travelMode: google.maps.TravelMode.DRIVING
  };


  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK)
      {
          
          var steps = response.routes[0].legs[0].steps;
          
          for(var step = 0; step < steps.length; step++)
          {
              polylineOptions = {
                      map: map,
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.2,
                      strokeWeight: 3,
                      path: steps[step].path
              }
          police = new google.maps.Polyline(polylineOptions);
          }
          
      }
      
  });
}



function calcRoute3(lat, lng) {
  var request = {
  origin:lat,
  destination:lng,
  travelMode: google.maps.TravelMode.DRIVING
  };


  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK)
      {
          
          var steps = response.routes[0].legs[0].steps;
          
          for(var step = 0; step < steps.length; step++)
          {
              polylineOptions = {
                      map: map,
                      strokeColor: "#FF0000",
                      strokeOpacity: 1,
                      strokeWeight: 4,
                      path: steps[step].path
              }
          police = new google.maps.Polyline(polylineOptions);
          }
          
      }
      
  });
}








/**
 * Handles click events on a map, and adds a new point to the Polyline.
 * @param {google.maps.MouseEvent} event
 */
function addLatLng(pts) {

  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear
  // path.push(event.latLng);
  path.push(pts);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);