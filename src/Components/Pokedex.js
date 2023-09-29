import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import Spinner from "./Spinner";

export default function Pokedex() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalpages, settotalpages] = useState(0);

  const fetchData = async (offset) => {
    const limit = 10;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const parsedData = await response.json();
    // totalpages = parsedData.count;
    // console.log(totalpages);

    setData(parsedData.results);
    settotalpages(Math.ceil(parsedData.count / 10));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setLoading(true);
    fetchData((page - 1) * 10);
  }, [page]);

  const handleNextPage = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const [fetchedPokemonData, setFetchedPokemonData] = useState([]); // State to store fetched data

  useEffect(() => {
    const fetchPokemonData = async () => {
      const newData = [];
      for (const pokemon of data) {
        let response = await fetch(pokemon.url);
        let pokemonData = await response.json();
        //   console.log(pokemonData);
        newData.push(pokemonData);
      }
      // console.log(newData);
      setFetchedPokemonData(newData); // Update state when all data is fetched
    };

    if (!loading) {
      fetchPokemonData();
    }
  }, [data, loading]);

  return (
    <div className="container">
      <div>
        <br />
        <h1 style={{ color: "white", textAlign: "center" }}>
          Welcome to PokeWorld
        </h1>
        <br />
      </div>
      {loading && <Spinner />}

      <div className="row">
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          data.map((pokemon, index) => {
            const height = fetchedPokemonData[index]?.height; // Use optional chaining to avoid errors
            const types = fetchedPokemonData[index]?.types
              .map((type) => type.type.name)
              .join(", "); // Extract and join the type names
            const hp = fetchedPokemonData[index]?.stats[0]?.base_stat; // HP stat
            const attack = fetchedPokemonData[index]?.stats[1]?.base_stat; // Attack stat
            const defense = fetchedPokemonData[index]?.stats[2]?.base_stat; // Defense stat
            const specialAttack =
              fetchedPokemonData[index]?.stats[3]?.base_stat; // Special Attack stat
            const specialDefense =
              fetchedPokemonData[index]?.stats[4]?.base_stat; // Special Defense stat
            const speed = fetchedPokemonData[index]?.stats[5]?.base_stat; // Speed stat
            const img2 =
              fetchedPokemonData[index]?.sprites.other.home.front_default; // Front default image URL

            return (
              <div className="col-md-4" key={index}>
                <Pokemon
                  imgUrl={img2}
                  name={pokemon.name}
                  ht={height}
                  tp={types}
                  hp={hp}
                  atk={attack}
                  def={defense}
                  spa={specialAttack}
                  spdef={specialDefense}
                  spd={speed}
                />
              </div>
            );
          })
        )}

        {!loading && (
          <div className="container d-flex justify-content-between my-4">
            <button
              type="button"
              disabled={page === 1}
              className="btn btn-dark"
              onClick={handlePrevPage}
            >
              &larr; Prev
            </button>
            <h4 style={{ color: "grey" }}>
              {page} out of {totalpages}
            </h4>

            <button
              type="button"
              className="btn btn-dark"
              onClick={handleNextPage}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
