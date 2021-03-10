// function that initializes as per instructions in API documentation: https://developers.google.com/maps/documentation/javascript/examples/streetview-simple#maps_streetview_simple-html
var score = 0;
var roundScore = 0;
var round = 1;
var guess;
var marker;
var map;
var panorama;

function initialize() {
	updateHeader();
    var targetLocation = pickRandomLocation();

    // INIT MAP + PANO
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 53.164164, lng: 5.781754 },
        zoom: 9,
        disableDefaultUI: true
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: targetLocation,
            pov: {
                heading: 0,
                pitch: 0,
            },
            disableDefaultUI: true,
            showRoadLabels: false
        }
    );
    map.setStreetView(panorama);

    // DROP MARKER
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        guess = event.latLng;
        roundScore = calculateRoundScore(targetLocation, guess);
        showConfirmationButton();

        console.log("roundScore: " + roundScore);
    });

};


// HELPER FUNCTIONS
// function that makes sure there is only one marker placed. 
function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

// function that returns a score based on user's guess and the location to guess (targetLocation)
function calculateRoundScore(targetLocation, guess) {
    var targetCoordinates = new google.maps.LatLng(targetLocation.lat, targetLocation.lng);
    var guessCoordinates = new google.maps.LatLng(guess.lat, guess.lng);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(targetCoordinates, guess); //Returns the distance, in meters, between two LatLngs
    var distanceKm = (distance / 1000).toFixed(2);
    console.log("distance: " + distanceKm)

    if (distanceKm < 50) {
        return Math.round((50 - distanceKm) * 2)
    } else {
        return 0
    }
};

// function that is called when the game is ended and presents user with final score.
function finishGame() {

}

// function that prompts user to confirm their guess
function confirm() {
    // update scores
    score = Math.round(score + roundScore);
    console.log("score: " + score);
    // next round unless all rounds are played
    if (round < 10) {
        updateOverlayScore();
        updateHeader();
		showOverlay();
        targetLocation = pickRandomLocation();
    } else {
        finishGame();
    }
};

function next() {
	round = round + 1;
	updateHeader();
	hideOverlay();
}

function restart() {
	score = 0;
	round = 1;
	marker;
	updateHeader();
	hideOverlay();
}

// function that returns a random location from a list of coordinates 
function pickRandomLocation() {
    var locations = [
        // leeuwarden
        { lat: 53.19190191016583, lng: 5.7203841970972515 },
        { lat: 53.205544637467575, lng: 5.784500311719222 },
        { lat: 53.202030790755444, lng: 5.779193154026794 },
        { lat: 53.20580144301832, lng: 5.809182534685858 },
        { lat: 53.21538763759376, lng: 5.810163200081598 },
        { lat: 53.21634639474099, lng: 5.800070053525822 },
        { lat: 53.1996422, lng: 5.7941603 },
        //dokkum
        { lat: 53.320786961239314, lng: 6.004216222617715 },
        { lat: 53.33896134564871, lng: 6.01446520065522 },
        { lat: 53.326723152145405, lng: 5.998869913983112 }
        // harlingen
        // franeker
        // sneek
        // heerenveen
        // joure
        // ijlst
        // heeg
        // drachten
        // burgum
        // grou
        // bolsward
        // makkum
        // balk
        // bakkeveen
        // buitenpost
        // stavoren
        // lemmer

        // vlieland
        // terschelling
        // ameland
        // schiermonnikoog
    ]

    randomLocation = locations[Math.floor(Math.random() * locations.length)];

    return randomLocation
};


// UPDATE DOM
// functions to show or hide the confirmation button
function showConfirmationButton() {
    document.getElementById("conf-button").style.display = 'block';
}
function hideConfirmationButton() {
    document.getElementById("conf-button").style.display = 'none';
}

function updateHeader() {
	document.getElementById("header-score").innerHTML = score;
	document.getElementById("header-round").innerHTML = round;
}

// functions to show or hide overlay etc.
function showOverlay() {
	document.getElementById("overlay").style.display = 'block';
}
function hideOverlay() {
	document.getElementById("overlay").style.display = 'none';
}
function updateOverlayScore() {
	hideConfirmationButton();
	document.getElementById("round-score").innerHTML = round;
	document.getElementById("round-score").innerHTML = "Round score: " + roundScore;
	document.getElementById("total-score").innerHTML = "Total score: " + score;
}
function clearOverlay() {
	document.getElementById("round-score").innerHTML = "";
	document.getElementById("round-score").innerHTML = "";
	document.getElementById("total-score").innerHTML = "";

}