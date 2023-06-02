import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import style from "./palabrasporminuto.module.css"
import { Wordsss } from "./Palabras";
import StarIcon from '@mui/icons-material/Star';




export default function Wordsbrasporminuto() {
    const [Foundword, setFoundword] = useState();
    const [Inputs, setInputs] = useState({
        longitud: "",
        count: "",
        word: "",
    });
    const [Caracterount, setCaracterount] = useState(0);
    const [time, setTime] = useState(0);
    const [Words, setWords] = useState([""]);
    const [Score, setScore] = useState({
        puntuacion: [
            {
                name: "",
                puntaje: ""
            }
        ]
    });
    const [Userscore, setUserscore] = useState(0);
    const [Try, setTry] = useState(5);
    console.log(Userscore, "user score usuariod e score")
    function handleSubmit(e) {
        e.preventDefault();
        if (Inputs.word.toLowerCase() === Foundword.toLowerCase()) {
            setWords(() => Words.filter(e => e !== Inputs.word.toLowerCase()))
            setFoundword(() => Words[(Math.random() * Words.length) | 0].toUpperCase());
            setCaracterount((Caracterount) => Caracterount + Foundword.length);
            const timeout = setTimeout(() => setTime(time + 2), 1000)
            setUserscore(() => Userscore + (Foundword.length + Try + (time / 2)))
            setInputs({ word: "" });
            return () => clearTimeout(timeout)

        } else if (Inputs.word !== Foundword) {
            const timeout = setTimeout(() => setTime(time - 20), 1000)
            setInputs({ word: "" });
            setTry(() => Try - 1)
            setUserscore(() => Userscore - (Foundword.length * Try))
            return () => clearTimeout(timeout)

        }
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("score"))
        data ? setScore(data) : alert("No hay datos guardados")

        if (Words.length === 0 && time > 0) {
            setTime(0);
            let contar = Score.puntuacion.length
            if (!Score.puntuacion[contar - 1].name) {
                alert("You win ¡¡");
                let userInput = prompt("Your name:");
                setScore(Score => {
                    const updatedPuntuacion = [...Score.puntuacion];
                    updatedPuntuacion[contar - 1] = { ...updatedPuntuacion[contar - 1], name: userInput }
                    updatedPuntuacion[contar - 1] = { ...updatedPuntuacion[contar - 1], puntaje: Userscore }
                    return { ...Score, puntuacion: updatedPuntuacion };
                })
            } else {
                alert("You win ¡¡");
                let userInput = prompt("Your name:");
                setScore(Score => {
                    const updatedPuntuacion = [...Score.puntuacion];
                    updatedPuntuacion[contar] = { ...updatedPuntuacion[contar], name: userInput }
                    updatedPuntuacion[contar] = { ...updatedPuntuacion[contar], puntaje: Userscore }
                    return { ...Score, puntuacion: updatedPuntuacion };
                })
            }
            //  location.reload() 
            setTimeout(() => { location.reload() }, 2000);
        }

        if (Try <= 0) {
            let contar = Score.puntuacion.length
            if (!Score.puntuacion[contar - 1].name) {
                alert("Se agotaron los intentos disponibles");
                let userInput = prompt("Your name:");
                setScore(Score => {
                    const updatedPuntuacion = [...Score.puntuacion];
                    updatedPuntuacion[contar - 1] = { ...updatedPuntuacion[contar - 1], name: userInput }
                    updatedPuntuacion[contar - 1] = { ...updatedPuntuacion[contar - 1], puntaje: Userscore }
                    return { ...Score, puntuacion: updatedPuntuacion };
                })
            } else {
                alert("Se agotaron los intentos disponibles");
                let userInput = prompt("Your name:");
                setScore(Score => {
                    const updatedPuntuacion = [...Score.puntuacion];
                    updatedPuntuacion[contar] = { ...updatedPuntuacion[contar], name: userInput }
                    updatedPuntuacion[contar] = { ...updatedPuntuacion[contar], puntaje: Userscore }
                    return { ...Score, puntuacion: updatedPuntuacion };
                })
            }
            setTimeout(() => { location.reload() }, 2000);
        }
    }, [Words, Try])



    useEffect(() => {
        if (time !== 0) {
            localStorage.setItem("score", JSON.stringify(Score));
            const timeout = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timeout);

        } else if (time === 0 && Words.length > 1) {
                alert("You luser se agoto el tiempo");
              
           location.reload
        }
    }, [time])


    async function reset(e) {
        e.preventDefault()
        setTime(60)
        setInputs({
            longitud: "",
            count: "",
            word: "",
        })
        setCaracterount(0);
        const result = await Wordsss(Inputs.count, Inputs.longitud);
        setWords(result);
        setUserscore(0);
        setTry(5)
        setFoundword(() => result[(Math.random() * result.length) | 0].toUpperCase());
    }


    const renderedItems = Object.entries(Score.puntuacion)
        .sort(([, a], [, b]) => b.puntaje - a.puntaje).slice(0, 50)
        .map(([index, e]) => (
            // <div key={index}>
            <ol key={index}>
                <li >
                    <div> <span>Name( {e.name.toUpperCase()} ) </span></div>



                    <div> <span><StarIcon fontSize="small" color="secondary" />  {e.puntaje}</span></div>

                </li>
            </ol>
            // </div>
        ));

    return (
        <div className={style.container}>
            {Boolean(time) && <h1>{Foundword}</h1>}

            <div className={style.data}>
                <h2>Contador: {Caracterount}</h2>
                <h5>Time: {time}</h5>
                <h5>Intentos: {Try}</h5>
            </div>
            {time === 0 ? (
                <>
                    <form className={style.form} action="submit">
                        <input value={Inputs.count} name="count" onChange={(e) => setInputs({ ...Inputs, [e.target.name]: e.target.value })} type="number" placeholder="Cantidad de Palabras" />
                        {/* <input value={Inputs.longitud} name="longitud" onChange={(e) => setInputs({ ...Inputs, [e.target.name]: e.target.value })} type="number" placeholder="Cantidad de caracteres" /> */}
                        <Stack direction="row" spacing={2}>
                            <Button
                                style={{ borderRadius: "5px", border: " solid", width: "100%", margin: "20px" }}
                                onClick={reset}
                                variant="outlined">Play</Button>
                        </Stack>
                    </form>
                    <div className={style.score}>
                        {renderedItems}
                    </div>

                </>

            ) : (
                <Box
                    className={style.form}
                    action="" onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width: '40ch', },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField autoFocus type="text" value={Inputs.word} name="word" onChange={(e) => setInputs({ ...Inputs, [e.target.name]: e.target.value })} id="standard-basic" label="Standard" variant="standard" />
                    <Button style={{ width: "100px" }} type="submit" variant="contained" endIcon={<AddIcon />}> </Button>
                </Box>
            )}

        </div>
    )
}