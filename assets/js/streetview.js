// function that initializes as per instructions in API documentation: https://developers.google.com/maps/documentation/javascript/examples/streetview-simple#maps_streetview_simple-html
var score = 0;
var mapCenter = { lat: 53.164164, lng: 5.781754 };
var roundScore = 0;
var round = 1;
var guess;
var guessed = [];
var marker;
var map;
var panorama;
var targetLocation;
var targetMarker;

function initialize() {
    updateHeader();
    targetLocation = pickRandomLocation();

    // INIT MAP + PANO
    map = new google.maps.Map(document.getElementById("map"), {
        center: mapCenter,
        zoom: 9,
        disableDefaultUI: true
    });
    panorama = new google.maps.StreetViewPanorama(
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
        guess = event.latlng;
            roundScore = calculateRoundScore(targetLocation, guess);
        showConfirmationButton();

        console.log("roundScore: " + roundScore);
    });
}


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
    var distance = google.maps.geometry.spherical.computeDistanceBetween(targetCoordinates, guess); //Returns the distance, in meters, between two LatLngs
    var distanceKm = (distance / 1000).toFixed(2);
    console.log("distance: " + distanceKm);

    if (distanceKm < 50) {
        return Math.round((50 - distanceKm) * 2);
    } else {
        return 0;
    }
}

// function that is called when the game is ended and presents user with final score.
function finishGame() {
    hideConfirmationButton();
    document.getElementById("overlay-title").innerHTML = "Well done!";
    document.getElementById("round-score").innerHTML = "Round score: " + roundScore;
    document.getElementById("total-score").innerHTML = "Total score: " + score;
    document.getElementById("next-round-button").style.display = 'none';
    showOverlay();
}

// function that prompts user to confirm their guess
function confirm() {
    // original map view
    map.panTo(mapCenter);
    map.setZoom(9);
    // update scores
    score = Math.round(score + roundScore);
    console.log("score: " + score);
    // show targetLocation on map
    targetMarker = new google.maps.Marker({
        position: targetLocation,
        map: map,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
    });
    // next round unless all rounds are played
    if (round < 10) {
        updateOverlayScore();
        updateHeader();
        showOverlay();
    } else {
        finishGame();
    }
}

function next() {
    round = round + 1;
    updateHeader();
    updateTargetLocation();
    hideOverlay();
}

function restart() {
    score = 0;
    round = 1;
    guessed = [];
    updateHeader();
    hideOverlay();
    updateTargetLocation();
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
        { lat: 53.326723152145405, lng: 5.998869913983112 },
        { lat: 53.34919010954394, lng: 6.052439115760428 },
        { lat: 53.3546458860689, lng: 6.070379208316323 },
        { lat: 53.37958885041606, lng: 6.053405577191851 },
        { lat: 53.402134596373855, lng: 6.08355873605828 },
        { lat: 53.37920500571261, lng: 6.162416186658355 },
        { lat: 53.408481509690716, lng: 6.158136991130159 },
        // harlingen
        { lat: 53.17385815540635, lng: 5.410517035510483 },
        { lat: 53.17489970863105, lng: 5.416555896436452 },
        { lat: 53.180919538676214, lng: 5.418959116710656 },
        { lat: 53.21780885796916, lng: 5.484781665437953 },
        { lat: 53.20785838580406, lng: 5.446112929323196 },
        { lat: 53.182119774441816, lng: 5.454340405659482 },
        { lat: 53.14136816152054, lng: 5.43726516880213 },
        { lat: 53.149948093638606, lng: 5.48471933354074 },
        { lat: 53.16509703172141, lng: 5.440150932641531 },
        // franeker
        { lat: 53.18707785561106, lng: 5.539001869358905 },
        { lat: 53.186403971500404, lng: 5.54421601843733 },
        { lat: 53.1876327169254, lng: 5.550289450088946 },
        { lat: 53.1769065741029, lng: 5.555445606694748 },
        { lat: 53.19516541026526, lng: 5.540906581611359 },
        { lat: 53.21507030051234, lng: 5.565770231189668 },
        { lat: 53.236143227218356, lng: 5.548352627196863 },
        { lat: 53.171439582358076, lng: 5.570275123241714 },
        { lat: 53.16413708363866, lng: 5.590779943730825 },
        { lat: 53.19703618477469, lng: 5.625389419127212 },
        { lat: 53.15692423110521, lng: 5.562376572927352 },
        { lat: 53.17120493998345, lng: 5.543741161830656 },
        // sneek
        { lat: 53.03232324682462, lng: 5.659978492029121 },
        { lat: 53.03250262007665, lng: 5.662320289836676 },
        { lat: 53.03308271571832, lng: 5.666413676320213 },
        { lat: 53.027704902085695, lng: 5.731701372825111 },
        { lat: 53.04072538962247, lng: 5.780939911037498 },
        { lat: 53.041086281850504, lng: 5.769136514559674 },
        { lat: 53.028208535851356, lng: 5.781479152298241 },
        { lat: 53.01233811962758, lng: 5.768722137924576 },
        { lat: 53.029355242739854, lng: 5.6578095476054635 },
        { lat: 53.03163326385146, lng: 5.661451605865311 },
        { lat: 53.03524623386002, lng: 5.652001939711491 },
        { lat: 52.97727650282039, lng: 5.706173173656099 },
        { lat: 53.009060132006155, lng: 5.69420994944016 },
        { lat: 53.04932243595738, lng: 5.83611496241945 },
        { lat: 53.05086357355353, lng: 5.8302680470098105 },
        // heerenveen
        { lat: 52.956300033538916, lng: 5.922506661012685 },
        { lat: 52.95852213926476, lng: 5.922204200661111 },
        { lat: 52.95979674773782, lng: 5.924692374323016 },
        { lat: 52.95758147585904, lng: 5.927273518492206 },
        { lat: 52.97367518580548, lng: 5.919096874309474 },
        { lat: 52.96552981500001, lng: 5.91588121039509 },
        { lat: 52.950226021810685, lng: 5.969912471715378 },
        { lat: 52.96856727793018, lng: 5.971467052763902 },
        { lat: 52.94652965096347, lng: 5.873347675595512 },
        { lat: 52.85717191278747, lng: 6.074856808177568 },
        { lat: 52.890119733820995, lng: 6.142638673358429 },
        // joure
        { lat: 52.95737173868344, lng: 5.722628105821739 },
        { lat: 52.95813851571244, lng: 5.744168854582055 },
        { lat: 52.968079625432544, lng: 5.605401649628787 },
        { lat: 52.9689096356155, lng: 5.610878544227146 },
        { lat: 52.94356503055229, lng: 5.629890601077116 },
        { lat: 52.909650328916335, lng: 5.773251104040062 },
        { lat: 52.966030634033594, lng: 5.798397685384346 },
        { lat: 52.96757218700483, lng: 5.800515241820325 },
        { lat: 52.96975153796072, lng: 5.811100627200414 },
        { lat: 52.8718603231828, lng: 5.822540428947494 },
        { lat: 52.84428683770082, lng: 5.711656373170767 },
        { lat: 52.900257503782576, lng: 5.5855896172101955 },
        { lat: 52.929554716735204, lng: 5.599816143132832 },
        { lat: 52.95257689727521, lng: 5.50247833948082 },
        // ijlst
        { lat: 53.01034138615151, lng: 5.622027984448898 },
        { lat: 53.01343256493836, lng: 5.617192369077829 },
        { lat: 52.99626275586841, lng: 5.648716976508343 },
        { lat: 53.00888970614326, lng: 5.607381264627713 },
        // drachten
        { lat: 53.10536073993521, lng: 6.098307603011403 },
        { lat: 53.103336316105725, lng: 6.100755246260546 },
        { lat: 53.112373112697476, lng: 6.0999141571936555 },
        { lat: 53.09981097712275, lng: 6.109392375283676 },
        { lat: 53.10020725443474, lng: 6.070014211314626 },
        { lat: 53.10273886553014, lng: 6.073357859333747 },
        { lat: 53.09650964505862, lng: 6.103810439472345 },
        { lat: 53.130809240407714, lng: 5.940378381078977 },
        // burgum
        { lat: 53.19264910244169, lng: 5.99259017520816 },
        { lat: 53.194820567778244, lng: 5.996065491055572 },
        { lat: 53.2196468679104, lng: 5.98415980011061 },
        { lat: 53.18587871530371, lng: 5.981177399177041 },
        { lat: 53.21463731637874, lng: 5.94219211502858 },
        { lat: 53.18963699727222, lng: 5.999031703822796 },
        { lat: 53.16972476909296, lng: 5.967634613346402 },
        { lat: 53.20117947259941, lng: 6.111715225690722 },
        { lat: 53.25222272805181, lng: 6.144613646974299 },
        { lat: 53.27969425151374, lng: 6.147038203762646 },
        // grou
        { lat: 53.0788391310004, lng: 5.861173934723445 },
        { lat: 53.095713486024756, lng: 5.843791849231576 },
        { lat: 53.09674611808414, lng: 5.83997029769685 },
        { lat: 53.09453429222241, lng: 5.835857952968067 },
        { lat: 53.08227933781011, lng: 5.793143256407141 },
        { lat: 53.102914911051364, lng: 5.755101601628362 },
        { lat: 53.04878158776004, lng: 5.774985796381439 },
        { lat: 53.10289681364741, lng: 5.841814929231335 },
        { lat: 53.11624984316536, lng: 5.837042587701781 },
        // bolsward
        { lat: 53.06158892882842, lng: 5.520095450056366 },
        { lat: 53.05962212903817, lng: 5.535136527179098 },
        { lat: 53.05458879539317, lng: 5.540592160617126 },
        { lat: 53.06358954850745, lng: 5.499714070909069 },
        // makkum
        { lat: 53.051889183428415, lng: 5.380684525876183 },
        { lat: 53.055174597646946, lng: 5.403781155844117 },
        { lat: 53.06317718325453, lng: 5.3932208215220765 },
        { lat: 53.07411591576893, lng: 5.334864373521567 },
        // bakkeveen
        { lat: 53.08072365150786, lng: 6.25619625705456 },
        { lat: 53.07811677398619, lng: 6.250640682650618 },
        { lat: 53.08729020033408, lng: 6.2744269680786475 },
        { lat: 52.950923942089204, lng: 6.342862069552874 },
        { lat: 52.9539055100307, lng: 6.336369670718592 },

        // vlieland
        { lat: 53.268229720867616, lng: 4.970402649788467 },
        { lat: 53.29528578221432, lng: 5.066466067123986 },
        { lat: 53.29640511057135, lng: 5.075179219132039 },
        // terschelling
        { lat: 53.35751303991377, lng: 5.217047526572046 },
        { lat: 53.36133358204809, lng: 5.215993417467618 },
        { lat: 53.37338577859494, lng: 5.241919366658577 },
        // ameland
        { lat: 53.44118075276919, lng: 5.637793674706524 },
        { lat: 53.44931842019199, lng: 5.619212660622097 },
        { lat: 53.43772623110017, lng: 5.774612715029936 },
        // schiermonnikoog
        { lat: 53.47174562005584, lng: 6.196876467891345 },
        { lat: 53.4797354203129, lng: 6.162766270214954 },
    ];

    var randomLocation = locations[Math.floor(Math.random() * locations.length)];
    guessed.push(randomLocation);

    return randomLocation;
}

function updateTargetLocation() {
    targetLocation = pickRandomLocation();
    panorama.setPosition(new google.maps.LatLng(targetLocation));
    map.panTo(mapCenter);
    map.setZoom(9);
    targetMarker.setMap(null);
}

// UPDATE DOM
// functions to show or hide the confirmation button
function showConfirmationButton() {
    document.getElementById("conf-button").style.display = 'block';
}

function hideConfirmationButton() {
    document.getElementById("conf-button").style.display = 'none';
}

// function that updates the information in the header
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
    document.getElementById("overlay-title").innerHTML = "Round " + round;
    document.getElementById("round-score").innerHTML = "Round score: " + roundScore;
    document.getElementById("total-score").innerHTML = "Total score: " + score;
}