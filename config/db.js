var convict       = require('convict');

var config = convict({
 
  db: {
    main: {
      doc: 'Main database',
      format: String,
      default: 'mongodb://127.0.0.1/sc-test',
      env: 'MONGO_MAIN'
    }
  }
});


module.exports = config;