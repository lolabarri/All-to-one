document.addEventListener('DOMContentLoaded', () => {

function startMap() {
  const ateneo = {
  	lat: 40.433775,
  	lng: 3.7190415};
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: ateneo
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

startMap();

}, false);