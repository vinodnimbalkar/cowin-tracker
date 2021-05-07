#!/usr/bin/env node
const axios = require('axios');
const yargs = require('yargs');
const chalk = require('chalk');

const baseUrl =
  'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin';

// Create check command
yargs.command({
  command: 'check',
  describe: 'It will check vaccine availibility in your area',
  builder: {
    pincode: {
      alias: 'p',
      describe: 'Provide pincode to check vaccine in pincode area',
      demandOption: true,
      type: 'number',
    },
  },
  builder: {
    age: {
      alias: 'a',
      describe: 'Provide age for check vaccine for certain age group',
      demandOption: true,
      type: 'number',
    },
  },
  handler: function (argv) {
    let pincode = argv.pincode || argv.p;
    let age = argv.age || argv.a;
    if (pincode === undefined) {
      console.log('Pincode is required !');
      return;
    }
    if (typeof (argv.pincode === 'number')) {
      getData(pincode)
        .then((data) =>
          console.log(getHumanReadableFormate(findCenters(data, age)))
        )
        .catch((e) =>
          console.log(
            `Something went wrong with status code ${e.response.status}\nPlease create issue at https://github.com/vinodnimbalkar/cowin-tracker`
          )
        );
    }
  },
});

async function getData(pincode) {
  const date = new Date().toLocaleDateString().replace('/', '-');
  headers = {
    'accept': 'application/json, text/plain',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'origin': 'https://www.cowin.gov.in',
    'referer': 'https://www.cowin.gov.in/',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
  };
  params = {
    pincode,
    date,
  };
  const response = await axios.get(baseUrl, { params });
  const data = await response.data;
  return data;
}

function findCenters(data, age) {
  try {
    const { centers } = data;
    let result = [];
    for (let center of centers) {
      const {
        name,
        pincode,
        district_name,
        block_name,
        address,
        fee_type,
        sessions,
      } = center;
      let sessions_result = sessions
        .map(({ available_capacity, date, min_age_limit, vaccine }) => {
          return { available_capacity, date, min_age_limit, vaccine };
        })
        .filter(({ available_capacity }) => available_capacity !== 0)
        .filter(({ min_age_limit }) => min_age_limit <= age);
      if (sessions_result.length !== 0) {
        let center_data = {
          name,
          pincode,
          district_name,
          block_name,
          address,
          fee_type,
          sessions: sessions_result,
        };
        result.push(center_data);
      }
    }
    return result;
  } catch (e) {
    return [];
  }
}

function getHumanReadableFormate(centerData) {
  const body = [];
  let count = 0;
  centerData.forEach((center) => {
    const { name, district_name, address, pincode, sessions } = center;
    body.push(`${name} ${address}, ${pincode}, ${district_name}`);
    count++;
    sessions.forEach(({ available_capacity, date, min_age_limit, vaccine }) => {
      body.push(
        `${available_capacity} doses of ${vaccine} vaccine for ${min_age_limit} age group avaible on ${date}`
      );
    });
    body.push('');
  });
  let countInfo = `Vaccine are avaible in ${count} centers \n`;
  let errorInfo = 'Sorry, vaccine not available at your area.';
  countInfo = count === 0 ? chalk.red(errorInfo) : chalk.blue(countInfo);

  return `${countInfo} ${chalk.green(body.join('\n'))}`;
}

yargs.parse();
