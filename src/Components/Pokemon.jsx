import { useState } from "react";

export default function Pokemon() {
    const Pokemons = [
        "Bulbasaur",
        "Ivysaur",
        "Venusaur",
        "Charmander",
        "Charmander",
        "Charmeleon",
        "Charizard",
        "Squirtle",
        "Wartortle",
        "Blastoise",
        "Caterpie",
        "Metapod",
        "Butterfree",
        "Weedle",
        "Kakuna",
        "Beedrill",
        "Pidgey",
        "Pidgeotto",
        "Pidgeot",
        "Rattata",
        "Raticate",
        "Spearow",
        "Fearow",
        "Ekans",
        "Arbok",
        "Pikachu",
        "Raichu",
        "Sandshrew",
        "Sandslash",
        "Nidoran♀",
        "Nidorina",
        "Nidoqueen",
        "Nidoran♂",
        "Nidorino",
        "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett"
    ];
    const ramdon = Math.floor(Math.random() * Pokemons.length)
    const [Match, setMatch] = useState(ramdon);
    const [poke, setPoke] = useState(false)
    const [name, setName] = useState("")


function prueba (){
    setPoke(false)
    setMatch(ramdon)
}

    function handleSubmit(e) {
        e.preventDefault()
        console.log(Pokemons[Match - 1])
        if (name === Pokemons[Match - 1]) {
            setPoke(true)
            setName("")
            setTimeout(prueba, 5000);
            
        } else {
            setName("")
        }

    }
    return (
        <div>
            <div style={{margin:"10px"}}>
                <img
                style={{ 
                    position:"relative", left:"150px", padding:"10px",
                    width: "500px", filter: poke  ? "none" : "brightness(0) invert(1)" }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Match}.png`} alt="" />
            </div>
            <div>
                 <form
                onSubmit={handleSubmit} action="">
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                <button type="submit" >Submit</button>
            </form>
            </div>


        </div>
    )
}