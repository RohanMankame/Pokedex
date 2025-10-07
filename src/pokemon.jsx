import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {

    const[pokemon,setPokemon] = useState([]);

    const[loading, setloadig] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() =>{

        const API = "https://pokeapi.co/api/v2/pokemon?limit=115";

        const fetchPokemon = async() => {
            try{
                const res = await fetch(API);
                const data = await res.json();
               /*console.log(data); */

                const detailedPokemonData = data.results.map( async (currPokemon) => {
                    /* console.log(currPokemon.url) */
                    const res = await fetch(currPokemon.url);
                    const data = await res.json();
                    return data;
                });

                console.log(detailedPokemonData);

                const detailedResponses = await Promise.all(detailedPokemonData);
                console.log(detailedResponses);
                setPokemon(detailedResponses);
                setloadig(false);
                


            }
            catch(error){
                setloadig(false);
                setError(error);
                console.log(error);

            }
            
        };

        fetchPokemon();
    }, []);

    if(loading){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>Error occured</h1>
            </div>
        )
    }

    return (<>
    <section className="container">

        <header>
            <h1>PokeDex</h1>
        </header>

        <div>
            <ul className="cards">
                {
                    pokemon.map((currPokemon)=>{
                        return<PokemonCard key={currPokemon.id} pokemonData = {currPokemon} />
                    })
                }
            </ul>
        </div>

    </section>
    </>
    );
};