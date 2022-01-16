const mongoose = require('mongoose');

(async ()=> {
  try {
    await mongoose.connect('mongodb+srv://magreda16:Mr452452@cluster0.bq7tj.mongodb.net/soloproject?retryWrites=true&w=majority');
    console.log('Connected to the database !!');
  } catch (err) {
    console.log('Could not connect to the database', err);
  }
})();

module.exports = mongoose;
