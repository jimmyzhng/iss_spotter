const request = require("request");

const fetchMyIP = function(callback) {

  request('https://api.ipify.org', (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, body);
  });
};

// Fetching Coordinates by IP

const fetchCoordsByIp = (ip, cb) => {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      return cb(error, null);
    }

    const data = JSON.parse(body);

    if (!data.success) {
      let msg = `Success status was ${data.success}. Server message says ${data.message}`;
      return cb(Error(msg), null);
    }

    let latLong = { latitude: data.latitude, longitude: data.longitude };
    cb(error, latLong);


  });

};

// Fetching ISS flyovers
const fetchIss = (coordinates, cb) => {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates["latitude"]}&lon=${coordinates["longitude"]}`, (error, resp, body) => {

    if (error) {
      console.log('status', resp.statusCode);
      return cb(error, null);
    }

    if (resp.statusCode !== 200) {
      let msg = `Status code was ${resp.statusCode}. Error message is ${body}!`;
      return cb(Error(msg), null);
    }

    const data = JSON.parse(body).response;
    return cb(null, data);
  });

};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {

  // First we find our IP
  fetchMyIP((error, ip) => {
    if (error) {
      console.log(`It did not work! Error: ${error}`);
      return;
    }
    // We have our IP, we now use it on this function
    fetchCoordsByIp(ip, (error, data) => {
      if (error) {
        return console.log('It didnt work!', error);
      }
      // We now have our coordinates
      fetchIss(data, (error, data) => {
        if (error) {
          return console.log('It didnt work!', error);
        }
        // We now have our data in array form
        return callback(error, data);
      });
    });
  });
};





module.exports = { nextISSTimesForMyLocation };