(function() {

  var TrafficEye = {
    map               : this.map,
    poly              : this.poly,
    start             : this.start || 0,
    end               : this.end || 0,
    directionsDisplay : this.directionsDisplay,

    init: function () {
            setup_feedback();
          	this.directionsDisplay = new google.maps.DirectionsRenderer();
          	// Load Map
          	var centerOnAccra = {
                zoom      : 12,
                center    : new google.maps.LatLng(5.539445648546757, -0.2032470703125),
                mapTypeId : google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('map_canvas'), centerOnAccra);


            // google.maps.event.addListener(map, 'click', TrafficEye.callback.call(TrafficEye));
            google.maps.event.addListener(map, 'click', function(evt) {
                enF(evt.latLng, map);
            });
            // google.maps.event.addListener(map, 'click', function(evt) {
            //   console.log(evt.latLng);
            // });

          	this.directionsDisplay.setMap(map);
          },

    callback: function () {
              var $this = this;
              return function (evt) {
                if   ($this.start == 0)
                    $this.start = evt.latLng;
                else {
                    $this.end = evt.latLng;
                    $this.traceRoute($this.start, $this.end);
                    $this.start = 0;
                    $this.end = 0;
                }
                
              }
          },


  /*
   *  Function traceRoute - draws a thick colored line between two points.
   *
   *  start_point (google.maps.LatLng | string) -> Cordinates for the start point of the road
   *  end_point   (google.maps.LatLng | string) -> Cordinates for the end point of the road
   *  intensity   (string)                      -> a string code which specifies the intensity of traffic from start_point to end_point.
   *
   *  Intensity Codes
   *      1. heavy (string) : represents very intense traffic congestions and go slows.   colored RED
   *      2. light (string) : represents average/little traffic intensities.              colored YELLOW.
   *      3. no    (string) : represents no traffic.                                      colored GREEN.
   */

    traceRoute: function (start_point, end_point, intensity) {
        var request = {
            origin      : start_point,
            destination : end_point,
            travelMode  : google.maps.TravelMode.DRIVING
        };


        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var steps = response.routes[0].legs[0].steps;

                for(var step = 0; step < steps.length; step++) {
                    polylineOptions = {
                            map: this.map,
                            strokeColor: TrafficEye.getColor(intensity),
                            strokeOpacity: 1,
                            strokeWeight: 4,
                            path: steps[step].path
                    }

                    trafficState = new google.maps.Polyline(polylineOptions);
                }
            }
        });
    },


    /*
     *  Function getColor - encodes strings into a color
     *
     *  intensity (string)   -> a string code which specifies the intensity of traffic.
     *
     *  Returns : a color code
     */
    getColor: function (intensity) {
        var red    = '#FF0000';   // Signifies Heavy Traffic
        var green  = '#00FF00';   // Signifies No Traffic
        var yellow = '#FFFF00';   // Signifies Light Traffic
        

        var lev = intensity.toLowerCase();

        if (lev == 'heavy')
          return red;

        else 
          return ((lev == 'light') ? yellow : green);

    }, // end function getColor


    


  }// end TrafficEye

  // set the global variable that will be called when Maps API is done loading
  window.go = TrafficEye.init;
  window.sam = TrafficEye.traceRoute;
})();