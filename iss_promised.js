const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body);
  return request(`http://ipwho.is/${ip.ip}`);
};

const fetchISSFlyOverTimes = (coord) => {
  const { latitude, longitude } = JSON.parse(coord);
  // console.log(longitude, latitude);
  return request(`https://iss-flyover.herokuapp.com/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      let parsed = JSON.parse(data).response;
      return parsed;
    });
};

module.exports = { nextISSTimesForMyLocation };

