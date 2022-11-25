const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = (passTimes) => {
  for (const pass of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  return printTimes(passTimes);

});
