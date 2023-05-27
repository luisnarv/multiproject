import React, { useEffect, useRef, useState } from "react";
import style from "./Pokemon.module.scss";
import { PokemonData, imagenes } from "./Pokemons";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;

}
const shuffledArray = shuffleArray(PokemonData)


export default function Pokemon() {
    const randomIndex = Math.floor(Math.random() * shuffledArray.length)
    const [matchIndex, setMatchIndex] = useState(randomIndex);
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("Facil");
    const [Filter, setFilter] = useState(false);
    const [time, setTime] = useState(0)
    const [leaveState, setLeaveState] = useState(false);
    const [count, setCount] = useState(0)
    const difficulties = ['Facil', 'Normal', "Dificil"];
    const handleMouseEnter = () => setLeaveState(true);
    const handleMauseLeave = () => setLeaveState(false);



    function chageImage() {
        setMatchIndex(randomIndex)
        setFilter(false)
    };


    /*--------------------------------------------------------------------------- */
    function changeBackgorund(e) {
        if (e) {
            let currentIndex = e;
            const background = document.getElementById("background");
            currentIndex = (currentIndex + 1) % imagenes.length;
            background.style.backgroundImage = ` url(${imagenes[currentIndex]})`
        } else {
            let currentIndex = 0;
            const background = document.getElementById("background");
            currentIndex = (currentIndex + 1) % imagenes.length;
            background.style.backgroundImage = ` url(${imagenes[currentIndex]})`
        }
    };

    /*--------------------------------------------------------------------------- */

    useEffect(() => {
        setTime(difficulty === "Dificil" ? 60 : 0)
    }, [difficulty])

    useEffect(() => {
        if (time !== 0) {
            const timeout = setTimeout(() => setTime(time - 1), 1000)
            return () => clearTimeout(timeout,);
        } else {
            const interval = setInterval(changeBackgorund, 20000);
            return () => clearInterval(interval);
        };

    }, [time])




    function handleReset() {
        setMatchIndex(randomIndex);
        setCount(0);
        setName("");
    }

    function handleSubmit(e) {
        e.preventDefault()
        //console.log(PokemonData[matchIndex - 1].name.toLocaleLowerCase())
        if (name.toLocaleLowerCase() === PokemonData[matchIndex - 1].name.toLocaleLowerCase() || name.toLocaleLowerCase() === "nidoran") {
            setName("");
            setCount(() => setCount(count + 1));
            setTimeout(chageImage, 3000);
            setFilter(true)
            if (difficulty === "Dificil") {
                const interval = setInterval(changeBackgorund(matchIndex), 5000);
                return () => clearInterval(interval);
            }
        } else { setName("") };
    };


    return (
        <div className={style.principal}>
            <div>
                <img style={{ width: "300px", }} src="../../img/pokemon/3.png" alt="" />
            </div>
            <div>
                <Autocomplete
                    id="disabled-options-demo"
                    options={difficulties}
                    value={difficulty}
                    sx={{ width: 250, margin: "10px", height: "50px", backgroundColor: "#ffffff99", borderRadius: "5px" }}
                    onChange={(e, v) => { setDifficulty(v), handleReset(v) }}
                    renderInput={(params) => <TextField
                        {...params} label="Dificultad"
                    />}
                />
            </div>

            <div className={style.container} id="background" >
                <div>
                    <img className={style.imag} src="../../img/pokemon/1.png" alt="" />
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                    {difficulty === "Dificil" && time === 0 ? "" : <div>  <img className={style.pokemon} style={{ filter: Filter && "none" }}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matchIndex}.png`}
                        alt="pokemon.png" />
                    </div>
                    }
                    <div style={{ position: "relative", display: "inline-block" }} >
                        <img style={{ width: "200px" }}
                            src="../../img/pokemon/4.png" alt="Pista"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMauseLeave}
                        />
                        {difficulty !== "Dificil" && <div className={style.info} >
                            <p>Pokemons encontrados: {count}</p>
                        </div>}

                        {difficulty === "Facil" && leaveState ?
                            (
                                <div className={style.info} >
                                    <p>Pokemon tipo: {PokemonData[matchIndex - 1].type}</p>
                                    <p>Caracteres: {PokemonData[matchIndex - 1].name.length}</p>
                                </div>
                            ) : difficulty === "Normal" && leaveState ?
                                (<div className={style.info} >
                                    <p>Pokemon tipo: {PokemonData[matchIndex - 1].type}</p>
                                </div>
                                ) : difficulty === "Dificil" ?
                                    (time !== 0 ? (
                                        <div>
                                            <p style={{
                                                color: "black", padding: "3px", borderRadius: "8px", background: time <= 15 ? "firebrick" : time <= 30 ? "yellow" : "#28c228d1",
                                            }} id="tiempo"  >Time: {time}</p>
                                        </div>)
                                        : (<div
                                            style={{
                                                display: "flex", flexDirection: "row", justifyContent: "space-around",
                                                alignItems: "center"
                                            }}
                                        >
                                            <div className={style.info} >
                                                <div>
                                                    <h1>Se acabo el tiempo {time.toUpperCase}</h1>
                                                    <h3> Pokemons encontrados: {count} </h3>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    ) : ""
                        }
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit} action="" >
                        <input value={name} className={style.inputt}
                            onChange={(e) => setName(e.target.value)} type="text" />
                        <button style={{ height: "50px", fontSize: "1rem ", cursor: "pointer" }}
                            type="Submit"  > Pokemon</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
