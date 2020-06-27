const axios = require ('axios');
const async = require ('async');
const _ = require ('underscore');
const baseurl = 'https://api.data.abs.gov.au';

console.log (`--- Started with concurrency of ${process.argv[2]}`);
var ndfs = 0;

(async () => {
  const getDataflows = async () => {
    const response = await axios.get (`${baseurl}/dataflow/all/all/latest`, {
      headers: {
        Accept: 'application/json'
      }
    }).catch ((error) => {
      console.log (`**** ERROR getting dataflow ${error.response.status} ${error.response.statusText}`);
      process.exit (1);
    });
    return _.keys (response.data.references);
  };

  let dataflows = await getDataflows ();
  console.log (`Retrieved  ${dataflows.length} dataflow ids`);

  async.eachOfLimit (dataflows, process.argv[2] ? Number (process.argv[2]) : 1,
    async (dfid) => {
      const dfname = dfid.match (/(.+)=(.+):(.+)\((.+)\)/)[3];
      const response = await axios.get (
        `${baseurl}/datastructure/ABS/${dfname}/1.0.0?references=children`,
        {
          headers: {
            Accept: 'application/json'
          }
        });
      ndfs++;
      console.log (`Retrieved dataflow ${dfname} ${response.statusText}`);
    }, (err) => {
      if (err) {
        console.log (`**** ERROR ${err.message} after ${ndfs} requests`);
      } else {
        console.log (`--- Completed ${ndfs} requests with concurrency of ${process.argv[2]}`);
      }
    });
}) ();

