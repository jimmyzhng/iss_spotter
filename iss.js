const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org', (error, response, body) => {
    // console.log(response);

    if (error) {
      return callback(error, null);
    }

    // If not 200 status, we assume it is a server error
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, body);
  });
};

// Fetching Coordinates by IP

// const fetchCoordsByIp = (ip, cb) => {

//   request(`http://ipwho.is/${ip}`, (error, response, body) => {

//     if (error) {
//       return cb(error, null);
//     }

//     const data = JSON.parse(body);

//     if (!data.success) {
//       let msg = `Success status was ${data.success}. Server message says ${data.message}`;
//       return cb(Error(msg), null);
//     }

//     let latLong = { latitude: data.latitude, longitude: data.longitude };
//     cb(error, latLong);


//   });

// };

module.exports = { fetchMyIP, fetchCoordsByIp };