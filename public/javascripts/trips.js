let tripId;
const startTrip = car => {
  axios.post(`/trips/start/${car}`, {}).then(trip => { console.log(trip);
    document.getElementById("isFree").innerText="Is Free?: false";
    document.getElementById("newTrip").style.display="none";
    document.getElementById("finishTrip").style.display="block";
    tripId=trip.data._id;
  })
};

const finishTrip = () => {
  console.log(tripId);
  axios.post(`/trips/finish/${tripId}`, {}).then(trip => { console.log(trip);
    document.getElementById("isFree").innerText="Is Free?: true";
    document.getElementById("newTrip").style.display="block";
    document.getElementById("finishTrip").style.display="none";
  })
};

const saveLocation = car => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      axios.post(`/trips/location/${car}`, {location: center}).then(car => console.log(car))
})}}