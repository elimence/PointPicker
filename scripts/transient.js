
var LatLng_Hound = {


	init: function (map) {
		// add code
	},

	readPoints: function () {
		// add code
	}

}// end LatLng_Hound

var road = '';
var $map;
var $a;
var $b;

function Road (start, end, segment, parent) {
	this.$start   = start,
	this.$end     = end,
	this.$segment = segment,
	this.$parent  = parent
}

Road.prototype.toString = function (output) {
	var str = '';

	str = str.concat('Main Road   : ').concat(this.$parent).concat('\n');
	str = str.concat('Sub Road    : ').concat(this.$segment).concat('\n');
	str = str.concat('Start point : ').concat(this.$start).concat('\n');
	str = str.concat('End point   : ').concat(this.$end);

	output == 'Console' ? window.console.log(str) : alert(str);
};


Road.prototype.toDB = function (argument) {
	// body...
}






var SidePanel = {
	$sidePane 	: this.sidePane,
	$road 		: this.road,
	$segment	: this.segment,
	$start 		: this.start,
	$end 		: this.end,

	init: function () {

		var chs = [
			{text: 'Console', val: 'c'},
			{text: 'Alert',   val: 'a'},
		];

		var arr = [
		  {text : 'N1', 				val: 'N1:  Malaam junction to Tetteh-Quashie'},
		  {text : 'Adenta-TQ', 			val: 'Adenta Barrier to Tetteh-Quashie'},
		  {text : 'Motorway', 			val: 'Motorway:  Tetteh-Quashie to Motorway Roundabout in Tema'},
		  {text : 'Spintex Road I', 	val: 'Spintex Road I:  Accra Mall to Coca-Cola Roundabout'},
		  {text : 'Spintex Road II', 	val: 'Spintex Road II:  Coca-Cola Roundabout to Sukomono Junction'},
		  {text : 'Beach Road', 		val: 'Beach Road:  Labadi – Nungua Checkpoint'},
		  {text : 'Graphic-Malaam', 	val: 'Graphic Road – Malaam Junction'},
		  {text : 'Ring Road West', 	val: 'Ring Road West:  Nkrumah Circle through Obetsebi Circle to Korle-Bu'},
		  {text : 'Ring Road East', 	val: 'Ring Road East:  Nkrumah Circle through Danquah Circle to Veterinary Hospital, La'},
		  {text : 'Independence Road', 	val: 'Independence Road:  Independence Circle (Ridge) to Tetteh-Quashie'},
		  {text : 'High Street', 		val: 'High Street:  Osu to AMA Office'},
		  {text : 'Nsawam Road', 		val: 'Nsawam Road:  Nkrumah Circle to Neoplan Station (beyond that if necessary)'},
		  {text : 'TBD', 				val: 'TBD'},
		  {text : 'TBD', 				val: 'TBD'},
		  {text : 'TBD', 				val: 'TBD'},
		];

		
		/* Main Contianer */
		this.sidePane = $("<div>", {
			id   : 'sidepane',
			class: 'infoPane'
		});

		
		/* Segment */
		this.segment = $('<input>', {
			id   : 'segment',
			class: 'cent'
		});

		/* Start Lat */
		this.startLat = $('<input>', {
			id   : 'startLat',
			class: 'latlng'
		}).prop('disabled','true').attr('type', 'text');
		/* Start Lng */
		this.startLng = $('<input>', {
			id   : 'startLng',
			class: 'latlng'
		}).prop('disabled','true').attr('type', 'text');


		/* End Lat */
		this.endLat = $('<input>', {
			id   : 'endLat',
			class: 'latlng'
		}).prop('disabled','true').attr('type', 'text');
		/* End Lng */
		this.endLng = $('<input>', {
			id   : 'endLng',
			class: 'latlng'
		}).prop('disabled','true').attr('type', 'text');


		/* Attach DOM Elements */

		this.sidePane.append($('<label>').text('SELECT MAIN STREET'));
		var sel = $('<select>').attr('id','road').appendTo(this.sidePane);
		$(arr).each(function() {
		 sel.append($("<option>").attr('value',this.val).text(this.text));
		});

		this.sidePane.append($('<label>').text('NAME OF SUB-SECTION'));
		this.sidePane.append(this.segment);

		this.sidePane.append($('<label>').text('START POINT'));
		this.sidePane.append(this.startLat);
		this.sidePane.append(this.startLng);

		this.sidePane.append($('<label>').text('END POINT').css('margin-top','4px'));
		this.sidePane.append(this.endLat);
		this.sidePane.append(this.endLng);


		var sel = $('<select>').attr('id','choice').appendTo(this.sidePane).css('width', '7em').css('margin-top','2em').css('display','inline');
		$(chs).each(function() {
		 sel.append($("<option>").attr('value',this.val).text(this.text));
		});

		this.sidePane.append($('<button>Display</button>').click(function() {
			var output = $('#choice').find(":selected").text();
			road.toString(output);
		}));

		this.sidePane.append($('<button>To DB</button>').click(function() {
			alert('hi');
		}).css('margin-left','5px'));

		this.sidePane.append($('<button>Reset</button>').click(function() {
			$('#startLat').val('');
			$('#startLng').val('');
			$('#endLat').val('');
			$('#endLng').val('');
			$('#segment').val('');
			road='';
		}).css('margin-left','5px'));		
		
	},

	create: function () {
		SidePanel.init();
		var parent = $("body");
		parent.append(this.sidePane);
		this.sidePane.draggable();
	},

	destroy: function () {
		$('.infoPane').remove();
	},

	clicker: function (ll, m) {
		$map = m;
		// alert($('startLat').text());
		if ($('#startLat').val() == '') {
			$a = ll;
			$('#startLat').val(ll.lat());
			$('#startLng').val(ll.lng());
		} else {
			$('#endLat').val(ll.lat());
			$('#endLng').val(ll.lng());
			$b = ll;
			try {
			var start = $('#startLat').val().concat(',').concat($('#startLat').val());
			var end = $('#endLat').val().concat(',').concat($('#endLat').val());
			var segment = $('#segment').val();
			var parent = $('#road').find(":selected").text();
			road = new Road($a, $b, segment, parent);
			sam(road.$start, road.$end, 'heavy');
		} catch (e) {
			
		}
		}
	}
}// end SidePanel





function Main () {
	$(document).bind('keystrokes', {
        // Destroy div on key combination
        keys: ['s', 't', 'o', 'p']                
    }, function(event){
        SidePanel.destroy();
    });

	window.console.log('started');
	SidePanel.create();
}


window.enF = SidePanel.clicker;

