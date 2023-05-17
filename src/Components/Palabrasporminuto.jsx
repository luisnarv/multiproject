import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import style from "./Palabrasporminuto.module.css"



const Words = [
    "abacus",
    "abdomen",
    "abdominal",
    "abide",
    "ability",
    "Orbitar",
    "Agujero negro",
    "Superstición",
    "Remitente",
    "Niño",
    "Hoy"

]



export default function Palabrasporminuto() {
    const [word, setWord] = useState(() => Words[(Math.random() * Words.length) | 0]);
    const [caractercount, setCaractercount] = useState(0)
    const [input, setInput] = useState("")
    const [time, setTime] = useState(0)


    function handleSubmit(e) {
        e.preventDefault();
        if (input === word) {
            setWord(Words[(Math.random() * Words.length) | 0]);
            setCaractercount((caractercount) => caractercount + word.length);
            const timeout = setTimeout(() => setTime(time + 5), 1000)
            setInput("")
            return () => clearTimeout(timeout)

        } else if (input !== word) {
            const timeout = setTimeout(() => setTime(time - 10), 1000)
            setInput("");
            return () => clearTimeout(timeout)

        }
    }

    useEffect(() => {
        if (time !== 0) {
            const timeout = setTimeout(() => setTime(time - 1), 1000)
            return () => clearTimeout(timeout)
        }
    }, [time])


    function reset(e) {
        e.preventDefault()
        setTime(60)
        setInput("")
        setCaractercount(0)
    }



    return (
        <div className={style.container}>
            {Boolean(time) && <h1 style={{ fontSize: "50px", }}>{word}</h1>}
            <h3>Contador: {caractercount}</h3>
            <p className={style.word} >+1</p>
            <h5  >Time: {time}</h5>

            {time === 0 ? (
                <Stack direction="row" spacing={2}>
                    <Button
                        style={{ borderRadius: "5px", border: " solid", width: "100%", margin: "20px" }}
                        onClick={reset}
                        variant="outlined">Play</Button>
                </Stack>
            ) : (
                <Box
                    style={{ display: "flex" }} action="" onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} style={{ backgroundColor: "white", padding: "10px", borderRadius: "2px" }} id="standard-basic" label="Standard" variant="standard" />

                    <Button style={{ width: "200px" }} type="submit"  variant="contained" endIcon={<AddIcon />}> </Button>
                </Box>
            )}

        </div>
    )
}