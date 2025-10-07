import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCard } from "./PokemonCard";
import PokemonLogo from './assets/PokemonLogo.png';

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setloadig] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [dots, setDots] = useState(""); 
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        const API = "https://pokeapi.co/api/v2/pokemon?limit=386";
        const fetchPokemon = async () => {
            try {
                const res = await fetch(API);
                const data = await res.json();
                const detailedPokemonData = data.results.map(async (currPokemon) => {
                    const res = await fetch(currPokemon.url);
                    const data = await res.json();
                    return data;
                });
                const detailedResponses = await Promise.all(detailedPokemonData);
                setPokemon(detailedResponses);
                setloadig(false);
            } catch (error) {
                setloadig(false);
                setError(error);
            }
        };
        fetchPokemon();
    }, []);

    // Animated dots effect
    useEffect(() => {
        if (!loading) return;
        const interval = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + "." : "");
        }, 50);
        return () => clearInterval(interval);
    }, [loading]);

    const SearchData = pokemon.filter((currPokemon) => {
    const matchesSearch = currPokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType
        ? currPokemon.types.some(t => t.type.name === selectedType)
        : true;
    return matchesSearch && matchesType;
});

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading{dots}</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Error occured</h1>
            </div>
        );
    }

    return (
        <>
            <section className="container">
                   
                <div className="SearchOptions">



                <div className="pokemon-search">



                    <input
                        type="text"
                        placeholder="Find Pokemon By Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="type-buttons">
                    <button
                        className={selectedType === "" ? "active-type" : ""}
                        onClick={() => setSelectedType("")}
                    >
                        All
                    </button>
                    {["fire", "water", "grass", "electric", "flying", "bug", "poison", "ground", "rock", "psychic", "ice", "dragon", "dark", "fairy", "steel", "ghost", "fighting", "normal"].map(type => (
                        <button
                            key={type}
                            className={selectedType === type ? "active-type" : ""}
                            onClick={() => setSelectedType(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                </div>




                <div>
                    <ul className="cards">
                        {
                            SearchData.map((currPokemon) => {
                                return <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
                            })
                        }
                    </ul>
                </div>

                <footer className="footer">
                    <p className="footer-text">Powered By Rohan Mankame</p>
                </footer>
            </section>
        </>
    );
};