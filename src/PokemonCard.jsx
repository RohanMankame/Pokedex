
const typeColors = {
  fire: "#ff825dff",
  water: "#7ac3ffff",
  grass: "#70e676ff",
  electric: "#ffe564ff",
  flying: "#90caf9",
  bug: "#aeea00",
  poison: "#eb7cffff",
  ground: "#c77256ff",
  rock: "#7c5f54ff",
  psychic: "#ff85aeff",
  ice: "#bee6f8ff",
  dragon: "#b58affff",
  dark: "#4b4444ff",
  fairy: "#fdb9d1ff",
  steel: "#b5c6ceff",
  ghost: "#697c86ff",
  fighting: "#e75629ff",
  normal: "#bdbdbd",
};






export const PokemonCard = ({ pokemonData }) => {

    const firstType = pokemonData.types[0]?.type?.name;
    const bgColor = typeColors[firstType] || "#fff";


    return <li className="pokemon-card"
            style={{ backgroundColor: bgColor }}
    >

    <div className="intro">
        <h1 className="pokemon-name">{pokemonData.name}</h1>
        <p className="pokemon-Hp">
                <span>Hp: </span> {pokemonData.stats[0].base_stat}
        </p>
    </div>

    <figure className="image-pokemon">
        <img src={pokemonData.sprites.other.showdown.front_default} alt={pokemonData.name} className="pokemon-image"
        
         />
         
    </figure>
    
    <div className="pokemon-type">
        <p> Type: 
            {
                pokemonData.types.map((currType) => currType.type.name).join(" / ")
            }
            
        </p>
    </div>


    <p className="moves">Moves: </p>
    <div className="grid-one-cols pokemon-highlight-moves">
        <p>
            {
                pokemonData.moves[0]?.move?.name 
                    ? pokemonData.moves[0].move.name 
                    : ""
            }
        </p>

        <p>
            {
                pokemonData.moves[1]?.move?.name 
                    ? pokemonData.moves[1].move.name 
                    : ""
            }
        </p>

        <p>
            {
                pokemonData.moves[2]?.move?.name 
                    ? pokemonData.moves[2].move.name 
                    : ""
            }
        </p>

        <p>
            {
                pokemonData.moves[3]?.move?.name 
                    ? pokemonData.moves[3].move.name 
                    : ""
            }
        </p>

    </div>

    {/* <div className="grid-two-cols pokemon-highlight-moves">

        <p>
            {
                pokemonData.moves[2]?.move?.name 
                    ? pokemonData.moves[2].move.name 
                    : ""
            }
        </p>

        <p>
            {
                pokemonData.moves[3]?.move?.name 
                    ? pokemonData.moves[3].move.name 
                    : ""
            }
        </p>

    </div> */}

    <div className="grid-three-cols ">

        <p className="pokemon-info">
            <span>Height: </span> {pokemonData.height}
        </p>

        <p className="pokemon-info">
            <span>Weight: </span> {pokemonData.weight}
        </p>

        <p className="pokemon-info">
            <span>Speed: </span> {pokemonData.stats[5].base_stat}
        </p>

    </div>

        

    </li>
}