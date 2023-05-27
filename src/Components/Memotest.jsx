import { useEffect, useState } from "react";
import { img } from "./Memotes";
import "./Memotest.scss";


// const img = [
//     " https://icongr.am/devicon/android-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/css3-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/gitlab-original-wordmark.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/go-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/javascript-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/nodejs-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/sequelize-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/visualstudio-plain.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/windows8-original.svg?size=100&color=currentColor",
//     "https://icongr.am/devicon/react-original.svg?size=100&color=currentColor",
// ].flatMap((image) => [`a|${image}`, `b|${image}`]
// ).sort(() => Math.random() - 0.5);



export default function Memotest() {
    const [leaveState, setLeaveState] = useState(false);
    const handleMouseEnter = () => setLeaveState(!leaveState);
    const [Count, setCount] = useState(0)
    const [Search, setSearch] = useState([]);
    const [Select, setSelect] = useState([]);
    const [Time, setTime] = useState(0);
    const [Play, setPlay] = useState(false);
    const [Input, setInput] = useState("");
    const [Imageload, setImageload] = useState([]);
    const Image = Imageload.flatMap((image) => [`a|${image}`, `b|${image}`]).sort(() => Math.random() - 0.5)
    const userImage = JSON.parse(localStorage.getItem("imageload"));

    useEffect(() => {
        if (Select.length === 2) {
            if (Select[0].split("|")[1] === Select[1].split("|")[1]) {
            
                setSearch((Search) => Search.concat(Select))
                setSelect([])
            } else {
                setTimeout(() => setSelect([]), 1000);
            }
        };

        if (Search.length === img.length) {
            alert("you win!!")
            location.reload()
        }
        if (userImage && Time > 0 && Play === false) {
            if (Search.length === userImage.length) {
                alert("you win!!")
                location.reload()
            }

        }
        if (Time !== 0) {
            const timeout = setTimeout(() => setTime(Time - 1), 1000)
            return () => clearTimeout(timeout)
        };

    }, [Select, Time])




    function handleimage(e) {
        setCount(Count +1)
        e.preventDefault()
        setImageload([...Imageload, Input])
        setInput("")
        localStorage.setItem("imageload", JSON.stringify(Image))
    }


    function handlefunctionPlay(e) {
        e.preventDefault();
        setPlay(true);
        setTime(60);
    }

    function handlefunctionPlayUser(e) {
        e.preventDefault();
        setPlay(false);
        setTime(60);
    }


    return (
        <>
            {Play !== true && Time === 0 ?
                <div className="container" >
                    <div>
                        <button type="submit" onClick={(e) => handlefunctionPlay(e)} >Play</button>
                        {Imageload.length < 10 || Imageload.length > 10 ? <button type="" disabled>Play</button> : <button type="submit" onClick={(e) => handlefunctionPlayUser(e)} >Play  </button>
                        }
                    </div>
                    <div>
                        <form className="formulario" action="submit" onSubmit={(e) => handleimage(e)} >
                            <h3>¿Quieres ingresar tus imagenes?</h3>
                            <div><p>Imagenes cargadas: {Count}</p>
                            <button onMouseEnter={handleMouseEnter} style={{
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                            }} type=""> <span
                                style={{ display: "flex", width: "25px", fontSize: "15px", justifyContent: "center" }}
                            >?</span></button></div>
                            
                        { leaveState &&    <div className="nohelp" onMouseLeave={handleMouseEnter} >
                                <p>Para ingresar imágenes debes agregar 10 URL de imágenes de Google
                                    busca las imágenes de tu preferencia en Google has clic derecho en la imagen
                                    Y dar clic en abrir imagen en una nueva ventana, puedes copiar la URL que te muestra en la parte de arriba.</p>
                                    <hr />
                                    <br />
                                    <hr />
                                <p>También puedes agregar iconos del siguiente enlace "https://icongr.am/" para agregar al juego, eliges el tema de tu preferencia
                                    seleccionas el icono que prefieres das clic del lado derecho te aparece una ventana con la URL que debes insertar </p>
                                    <br />
                                    <p>Nota: tamaño de la image no más de 700px</p>
                            </div>
}
                            <input value={Input} type="text" onChange={(e) => setInput(e.target.value)} />
                            <button type="submit">Ingresar</button>
                        </form>
                    </div>
                </div>
                :
                <>
                    <div>
                        <h1>Time: {Time} </h1>
                    </div>
                    <div className="marco">
                        <ul >
                            {Play === false && Time > 0 ? userImage.map((e) => {
                                const [, url] = e.split("|");
                                return (
                                    <li
                                        key={e}
                                        onClick={() => Select.length < 2 && setSelect((Select) => Select.concat(e))} >
                                        {Select.includes(e) || Search.includes(e) ? (
                                            <img alt="icon" src={url} />
                                        ) : (
                                            <img alt="icon" src="https://icongr.am/octicons/search.svg?size=128&color=currentColor" />
                                        )}
                                    </li>)
                            })
                                : img.map((e) => {
                                    const [, url] = e.split("|");

                                    return (
                                        <li
                                            key={e}
                                            onClick={() => Select.length < 2 && setSelect((Select) => Select.concat(e))} >
                                            {Select.includes(e) || Search.includes(e) ? (
                                                <img alt="icon" src={url} />
                                            ) : (
                                                <img alt="icon" src="https://icongr.am/octicons/search.svg?size=128&color=currentColor" />
                                            )}
                                        </li>
                                    )
                                })
                            }



                        </ul>

                    </div>
                </>
            }       </>
    )
}