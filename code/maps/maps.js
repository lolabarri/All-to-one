document.addEventListener('DOMContentLoaded', () => {

let map;
function startMap() {
  map = new google.maps.Map(
    document.getElementById('map'),
    {
      center: {lat: 40.433779, lng: -3.716794},
      zoom: 8
    }
  );
}

const myMarker = new google.maps.Marker({
  position: {
  	lat: 41.3977381,
  	lng: 2.190471916
  },
  map: map,
  title: "I'm here"
});

// startMap();

}, false);