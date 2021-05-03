const axios = require('axios');
const yargs = require('yargs');

const baseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin';

// Create check command
yargs.command({
  command : 'check',
  describe : 'It will check vaccine availibility in your area',
  builder : {
    pincode : {
      describe : 'Provide pincode to check vaccine in pincode area, accept multiple pincode also',
      demandOption: true,
      type: 'string',
      alias : 'p'
    }
  },
  builder : {
    age : {
      describe : 'Provide age for check vaccine for certain age group',
      type: 'number',
      alias: 'a'
    }
  },
  handler : function (argv){
    console.log(`Pincode : ${argv.pincode}`)
  }
})

async function getData(pincode){
  params = {
    pincode,
    date : new Date().toLocaleDateString().replace('/', '-'),
  }
  const response = await axios.get(baseUrl, {params});
  const data = await response.data;
  return data;
}

getData('400706').then(data=>console.log(data))
yargs.parse()
