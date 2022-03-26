import React from 'react';
import fetch from "node-fetch";
import lodash from "lodash";
import inquirer from "inquirer";

function pokecli() {

  let api_url = "https://pokeapi.co/api/v2/pokemon";
  var height = [];
  var weight = [];
  let limit;
  let offset;
  
  const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
  let start = Date.now();
  
  async function askLimit() {
    const answer = await inquirer.prompt({
      name: "limit",
      type: "input",
      message: "Choose your limit...",
      default() {
        return;
      },
    });
    limit = answer.limit;
  }
  
  async function askOffset() {
    const answer = await inquirer.prompt({
      name: "offset",
      type: "input",
      message: "Choose your offset...",
      default() {
        return;
      },
    });
    offset = answer.offset;
  }
  
  async function fetchPokemon() {
    fetch(`${api_url}?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((allPokemon) => {
        // console.log(allPokemon);
        allPokemon.results.forEach((pokemon) => {
          // console.log(pokemon);
          getPokemonData(pokemon);
        });
      });
    return;
  }
  
  function getPokemonData(pokemon) {
    let url = pokemon.url;
    fetch(url)
      .then((response) => response.json())
      .then((pokeData) => {
        // console.log(pokeData.types);
        height.push(pokeData.height);
        //   console.log(height);
        weight.push(pokeData.weight);
        //   console.log(weight);
      });
    return;
  }
  
  async function pokeAverages() {
    await sleep();
    console.clear();
    let heightSum = lodash.sum(height);
    let weightSum = lodash.sum(weight);
    let heightAverage = heightSum / limit;
    let weightAverage = weightSum / limit;
    console.log(`Averages for ${limit} pokemon...`);
    console.log("-----");
    console.log("Height Average: ", heightAverage);
    console.log("Weight Average: ", weightAverage);
    let end = Date.now();
    console.log(`Execution time: ${(end - start) / 1000} seconds`);
  }
  
askLimit();
askOffset();
fetchPokemon();
pokeAverages();

  return (
    <div>
      <h1>Pokecli firing</h1>
    </div>
  )
}

export default pokecli