import React, { useEffect, useState } from "react";
import style from "./Pokemon.module.scss";
import { PokemonData, imagenes } from "./Pokemons";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';







export default function Pokemon() {

    const ramdon = Math.floor(Math.random() * PokemonData.length)
    const [Match, setMatch] = useState(ramdon);
    const [pokeFilter, setPokefilter] = useState(false);
    const [name, setName] = useState("");
    const [Dificult, setDificult] = useState("Facil");
    const [time, setTime] = useState(0)
    const [enter, setleave] = useState(false);
    const [count, setCount] = useState(0)
    const Dif = ['Facil', 'Normal', "Dificil"];


    function prueba() {
        setPokefilter(false)
        setMatch(ramdon)
    };

    useEffect(() => {
        if (Dificult === "Dificil") {
            setTime(60)

        }
        if (Dificult === "Facil" || Dificult === "Normal") {
            setTime(0)

        }
    }, [Dificult])

    useEffect(() => {
        if (time !== 0) {
            const timeout = setTimeout(() => setTime(time - 1), 1000)
            return () => clearTimeout(timeout)

        }
    }, [time])

    let currentIndex = 0;

    if (Dificult !== "Dificil") {
        function changeIMG() {
            const background = document.getElementById("background");
            currentIndex = (currentIndex + 1) % imagenes.length;
            background.style.backgroundImage = ` url(${imagenes[currentIndex]})`
        };
        setInterval(changeIMG, 20000);
    }

    function reset(v) {
        setMatch(ramdon);
        setDificult(v);
        setCount(0);
        setName("");

    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(PokemonData[Match - 1].name.toLocaleLowerCase())
        if (name.toLocaleLowerCase() === PokemonData[Match - 1].name.toLocaleLowerCase()) {
            setPokefilter(true);
            setName("");
            setCount(() => setCount(count + 1));
            setTimeout(prueba, 5000);
            if (Dificult === "Dificil") {
                changeIMG()
            }
        } else { setName("") }
    };

    //setInterval(changeIMG, 10000);
    function hanldemouseEnter() { setleave(true) }
    function handlemauseLeave() { setleave(false) }

    return (
        <div className={style.principal}>
            <div>
                <img style={{ width: "300px", }} src="../../img/pokemon/3.png" alt="" />
            </div>

            <div>
                <Autocomplete
                    id="disabled-options-demo"
                    options={Dif}
                    value={Dificult}
                    sx={{ width: 150, margin: "10px", height: "50px", backgroundColor: "#ffffff99", borderRadius: "5px" }}
                    onChange={(e, v) => { reset(v) }}
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
                    <div>  <img
                        style={{
                            position: "relative", padding: "10px",
                            width: "400px", filter: pokeFilter ? "none" : "brightness(0) invert(1)"
                        }}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Match}.png`}
                        alt="" />
                    </div>

                    <div style={{ position: "relative", display: "inline-block" }} >
                        <img style={{ width: "200px" }}
                            src="../../img/pokemon/4.png" alt="Pista"
                            onMouseEnter={hanldemouseEnter}
                            onMouseLeave={handlemauseLeave}
                        />
                        {Dificult !== "Dificil" && <div style={{ backgroundColor: " blue", borderRadius: "5px  " }} >
                            <p>Pokemons encontrados: {count}</p>
                        </div>}

                        {Dificult === "Facil" && enter ?
                            (<div className={style.info} >
                                <p>Pokemon tipo: {PokemonData[Match - 1].type}</p>
                                <p>Caracteres: {PokemonData[Match - 1].name.length}</p>
                            </div>
                            ) : Dificult === "Normal" && enter ?
                                (<div className={style.info} >
                                    <p>Pokemon tipo: {PokemonData[Match - 1].type}</p>
                                </div>
                                ) : Dificult === "Dificil" ?
                                    (time !== 0 ? (
                                        <div>
                                            <p>Time: {time}</p>
                                        </div>)
                                        : (<div
                                            style={{
                                                display: "flex", flexDirection: "row", justifyContent: "space-around",
                                                alignItems: "center"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    transform: "translateX(-50%)", backgroundColor: "#000",
                                                    color: "#FFF", padding: "5px", opacity: "1",
                                                    transition: " opacity 0.3s ease", width: "200px"
                                                }}
                                                 >
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
                    <form style={{
                        display: "flex", justifyContent: "space-evenly", alignItems: "center",
                        flexDirection: "row", position: "absolute"
                    }}
                        onSubmit={handleSubmit} action=""
                    >
                        <input
                            // style={{ backgroundImage:"../../img/pokemon/1.png", width: "50%", height: "60px", borderRadius:"5px"  }} 
                            value={name}
                            className={style.inputt} onChange={(e) => setName(e.target.value)} type="text" />
                        <button style={{ height: "50px", fontSize: "1rem " }}
                            type="Submit"  > Pokemon</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
