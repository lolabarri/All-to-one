document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  function startMap() {
    let zurbano = { lat: 40.438765, lng: -3.69275 };
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: zurbano
    });
  

  const myMarker = new google.maps.Marker({
    position: zurbano,
    map: map,
    title: "I'm here"
  });
};

  startMap();

}, false);