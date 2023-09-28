
import React, { useState } from 'react';
import Pokemon from './Pokemon';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = async () => {
    console.log(searchQuery);
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchQuery}`;

      const response = await fetch(apiUrl);
      if (response.ok) {
        const parsedData = await response.json();
        setPokemonData(parsedData);
        // console.log(parsedData); // Display fetched data in the console
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          <a className="navbar-brand" href="/">Pokedex</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
            </ul>
        </div>
          <input
            type="text"
            placeholder="Enter your search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </nav>

      {pokemonData && (
        <div className="container mt-3">
          <Pokemon
            imgUrl={pokemonData.sprites.other.home.front_default}
            name={pokemonData.name}
            // name={searchQuery}
            ht={pokemonData.height}
            tp={pokemonData.types.map((type) => type.type.name).join(', ')}
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



