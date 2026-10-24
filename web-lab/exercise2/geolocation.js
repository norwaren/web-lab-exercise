const output = document.getElementById("geolocation");

function getGeolocation() {
  if (!navigator.geolocation) {
    output.textContent =
      "Geolocation is not supported by this browser.";
    return;
  }

  output.textContent = "Getting your location...";

  navigator.geolocation.getCurrentPosition(
    showGeolocation,
    showError,
    { timeout: 10000 }
  );
}

function showGeolocation(position) {
  output.textContent =
    "Latitude: " + position.coords.latitude +
    " | Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch (error.code) {
    case 1:
      output.textContent = "Location permission was denied.";
      break;

    case 2:
      output.textContent = "Location information is unavailable.";
      break;

    case 3:
      output.textContent = "The request to get your location timed out.";
      break;

    default:
      output.textContent = "An unknown error occurred.";
  }
}