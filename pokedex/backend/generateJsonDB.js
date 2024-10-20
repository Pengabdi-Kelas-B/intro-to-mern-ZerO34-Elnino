const fs = require("fs");
const axios = require('axios').default
console.log('test');

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
  // fetch API
  const response = axios.get(pokemonApiURL)
  console.log((await response).data.results);
  // Write data ke db.js
  const sample = {
    "pokemon": []
  }
  sample.pokemon = (await response).data.results

  fs.writeFileSync('db.json', JSON.stringify(sample, null, 4))

}

generateJsonDB();
