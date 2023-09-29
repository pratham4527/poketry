import React, { useState } from "react";
import Pokemon from "./Pokemon";
import Pokedex from "./Pokedex";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [isComponentVisible, setComponentVisibility] = useState(true);

  const handleSearch = async () => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      alert("Enter the Pokemon name");
    } else {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchQuery}`;

      const response = await fetch(apiUrl);
      if (response.ok) {
        const parsedData = await response.json();
        setComponentVisibility(!isComponentVisible);
        setPokemonData(parsedData);
        // console.log(parsedData); // Display fetched data in the console
      } else {
        alert("Please enter correct pokemon name");
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            style={{ width: "30px", margin: "0px 10px 0px 10px" }}
            src="./pokeWorldLogo.png"
            alt=""
          />

          <a className="navbar-brand" href="/">
            PokeWorld
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <input
            class="form-control me-2 w-25"
            type="text"
            placeholder="Enter the Pokemon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </nav>

      <div>{isComponentVisible && <Pokedex />}</div>

      {pokemonData && (
        <div className="container mt-3">
          <Pokemon
            imgUrl={pokemonData.sprites.other.home.front_default}
            name={pokemonData.name}
            ht={pokemonData.height}
            tp={pokemonData.types.map((type) => type.type.name).join(", ")}
            hp={pokemonData.stats[0]?.base_stat}
            atk={pokemonData.stats[1]?.base_stat}
            def={pokemonData.stats[2]?.base_stat}
            spa={pokemonData.stats[3]?.base_stat}
            spdef={pokemonData.stats[4]?.base_stat}
            spd={pokemonData.stats[5]?.base_stat}
          />
        </div>
      )}
    </div>
  );
}
