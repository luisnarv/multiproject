import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import style from "./palabrasporminuto.module.css"
import { Wordsss } from "./Palabras";



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

    //console.log(Words.length, "esto es Wordsbras nuwveasd")

    function handleSubmit(e) {
        e.preventDefault();
        if (Inputs.word === Foundword) {
            setWords(() => Words.filter(e => e !== Foundword))
            setFoundword(() => Words[(Math.random() * Words.length) | 0]);
            setCaracterount((Caracterount) => Caracterount + Foundword.length);
            const timeout = setTimeout(() => setTime(time + 5), 1000)
            setInputs({ word: "" });
            return () => clearTimeout(timeout)

        } else if (Inputs.word !== Foundword) {
            const timeout = setTimeout(() => setTime(time - 10), 1000)
            setInputs({ word: "" });
            return () => clearTimeout(timeout)

        }
    }

    useEffect(() => {
        if (Words.length === 0 && time !== 0) {
            alert("You win ¡¡");
            location.reload()

        }
        if (time !== 0) {
            const timeout = setTimeout(() => setTime(time - 1), 1000)
            return () => clearTimeout(timeout)
        }

    }, [time])


    async function reset(e) {
        e.preventDefault()
        setTime(60)
        setInputs("")
        setCaracterount(0)
        const result = await Wordsss(Inputs.count, Inputs.longitud)
        setWords(result)
        setFoundword(() => result[(Math.random() * result.length) | 0])
    }



    return (
        <div className={style.container}>
                   {Boolean(time) && <h1>{Foundword}</h1>}
           
            <div className={style.data}>
                <h2>Contador: {Caracterount}</h2>
                <h5>Time: {time}</h5>
            </div>
            {time === 0 ? (
                <form className={style.form} action="submit">
                    <input value={Inputs.count} name="count" onChange={(e) => setInputs({ ...Inputs, [e.target.name]: e.target.value })} type="number" placeholder="Cantidad de Palabras" />
                    <input value={Inputs.longitud} name="longitud" onChange={(e) => setInputs({ ...Inputs, [e.target.name]: e.target.value })} type="number" placeholder="Cantidad de caracteres" />
                    <Stack direction="row" spacing={2}>
                        <Button
                            style={{ borderRadius: "5px", border: " solid", width: "100%", margin: "20px" }}
                            onClick={reset}
                            variant="outlined">Play</Button>
                    </Stack>
                </form>

            ) : (
                <Box
                className={style.form}
                   // style={{ display: "flex",position:"relative"  }}
                     action="" onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1.5, width: '50ch', },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField autoFocus type="text" value={Inputs.word} name="word" onChange={(e) => setInputs({ ...Inputs, [e.target.name]: e.target.value })}  id="standard-basic" label="Standard" variant="standard" />

                    <Button style={{ width: "200px" }} type="submit" variant="contained" endIcon={<AddIcon />}> </Button>
                </Box>
            )}

        </div>
    )
}