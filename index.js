const { fetchMyIP, fetchCoordsByIp } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`It did not work! Error: ${error}`);
//     return;
//   }

//   console.log(`Your IP address is: ${ip}`);

// });

fetchCoordsByIp('70.79.235.13', (error, data) => {
  if (error) {
    return console.log('It didnt work!', error);
  }

  return console.log(data);
});