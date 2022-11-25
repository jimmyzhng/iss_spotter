const { nextISSTimesForMyLocation } = require('./iss_promised');

const printTimes = (risetimes) => {
  for (const pass of risetimes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(printTimes(passTimes));
  })
  .catch((err) => {
    console.log('It didnt work:', err.message);
  })



