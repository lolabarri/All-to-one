document.addEventListener(
  "DOMContentLoaded",
  () => {
    var map, infoWindow;
    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.4387765, lng: -3.6949021 },
        zoom: 13
      });
      infoWindow = new google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // infoWindow.setPosition(pos);
            // infoWindow.setContent("This is you");
            // infoWindow.open(map);
            map.setCenter(pos);
          },
          function() {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    initMap();

    // Putting cars on the map

    function getCar() {
      axios
        .get("http://localhost:3000/cars/api")
        .then(response => {
          placeCars(response.data.cars);
        })
        .catch(error => {
          next(error);
        });
    }

    const markers = [];
    function placeCars(cars) {
      cars.forEach(function(car) {
        const center = {
          lat: car.location.coordinates[1],
          lng: car.location.coordinates[0]
        };
        const pin = new google.maps.Marker({
          position: center,
          map: map,
          title: car.carMake
        });
        markers.push(pin);
      });
    }

    getCar();
  },
  false
);

// $(document).ready(function() {
//   $("#save").on("click", function() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         var center = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         const updateInfo = {
//           name: document.getElementById("update-name-input").value,
//           occupation: document.getElementById("update-occupation-input").value,
//           weapon: document.getElementById("update-weapon-input").value
//         };
//         const carId = document.getElementById("carName").value;

//         axios
//           .patch(
//             `localhost:3000/cars/${carId}`,
//             updateInfo
//           )
//           .then(response => {
//             console.log("Update SUCCESS!");
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       });
//     }
//   });
// });
