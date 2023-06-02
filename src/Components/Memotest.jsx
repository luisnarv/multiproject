import { useEffect, useState } from "react";
import { img } from "./Memotes";
import { Link } from "react-router-dom";
import "./Memotest.scss";

export default function Memotest() {
    const [leaveState, setLeaveState] = useState(false);
    const handleMouseEnter = () => setLeaveState(!leaveState);
    const [CountImage, setCountImage] = useState(0)
    const [Search, setSearch] = useState([]);
    const [Select, setSelect] = useState([]);
    const [Time, setTime] = useState(0);
    const [Play, setPlay] = useState(false);
    const [Input, setInput] = useState("");
    const [Imageload, setImageload] = useState([]);
    const Image = Imageload.flatMap((image) => [`a|${image}`, `b|${image}`]).sort(() => Math.random() - 0.5)
    const userImage = JSON.parse(localStorage.getItem("imageload"));

    useEffect(() => {
        if (userImage) {
            if (userImage[0].includes("a|") || userImage[0].includes("b|")) {
                const image = userImage.filter(e => e.includes("a|"))
                const image2 = image.map(image => image.slice(2, image.length))
                setImageload(image2);
                setCountImage(image2.length)
            } else {
                const image = userImage
                setImageload(image)
                setCountImage(image.length)
            }
        }
    }, [0])


    useEffect(() => {
        if (Select.length === 2) {
            if (Select[0].split("|")[1] === Select[1].split("|")[1]) {

                setSearch((Search) => Search.concat(Select))
                setSelect([])
            } else {
                setTimeout(() => setSelect([]), 1000);
            }
        };

        if (Search.length === img.length && Play === true) {
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
        e.preventDefault();
        setImageload([...Imageload, Input]);
        setCountImage(Imageload.length + 1);
        setInput("");
        localStorage.setItem("imageload", JSON.stringify(Image));
    }


    function handlefunctionPlay(e) {
        e.preventDefault();
        setPlay(true);
        setTime(60);
    }

    function handlefunctionPlayUserdata(e) {
        e.preventDefault();
        localStorage.setItem("imageload", JSON.stringify(Image));
        setPlay(false);
        setTime(60);
    }

    function handleFilter(e, id) {
        e.preventDefault()
        setImageload(Imageload.filter(image => image !== id));
        setCountImage(Imageload.length - 1)
        localStorage.setItem("imageload", JSON.stringify(Imageload.filter(image => image !== id)));
    }

    const help = (
        <div>
            <p>Para ingresar imágenes debes agregar 15 URL de imágenes, busca las imágenes de tu preferencia en Google has click derecho en la imagen, dar click en abrir imagen en una nueva ventana, puedes copiar la URL que te muestra en la parte superior.</p>
            <hr />
            <br />
            <hr />
            <p>También puedes agregar iconos del siguiente enlace  <Link to={"https://icongr.am/"} target="_blank" >https://icongr.am/</Link> para agregar al juego, eliges el tema de tu preferencia
                seleccionas el icono que prefieres das click del lado derecho te aparece una ventana con la URL que debes insertar. </p>
            <br />
            <p>Nota: tamaño de la image no más de 700px.</p>
        </div>

    )

    function handleInputChange(event) {
        const inputElement = event.target;
        const addima = document.getElementById("addima");
        const inputValue = inputElement.value;

        if (inputValue !== "") {
            addima.classList.add("animateOpen");
        } else {
            addima.classList.remove("animateOpen");
            addima.classList.add("animateClose");
        }
    }


    return (
        <>
            {Play !== true && Time === 0 ?
                <div className="container" >
                    <div>
                        <button type="submit" onClick={(e) => handlefunctionPlay(e)} >Play</button>
                        {Imageload.length === 15 ?
                            <button type="submit" onClick={(e) => handlefunctionPlayUserdata(e)} >Play </button>
                            : Imageload.length === 10 ?
                                <button type="submit" onClick={(e) => handlefunctionPlayUserdata(e)} >Play </button>
                                : <button style={{ cursor: "no-drop" }} type="" disabled>Play</button>
                        }
                    </div>
                    <div>
                        <form className="formulario" action="submit" onSubmit={(e) => handleimage(e)} >
                            <h3>¿Quieres ingresar tus imagenes?</h3>
                            <button onMouseEnter={handleMouseEnter} style={{
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                            }} type=""> <span
                                style={{ display: "flex", width: "25px", fontSize: "15px", justifyContent: "center" }}
                            >?</span></button>
                            <div>
                                <p>Imagenes cargadas: {CountImage}</p>

                                <div className="container image">
                                    <ul>
                                        {Imageload.map((image, i) => {
                                            return (
                                                <li className="lista" key={i} >
                                                    <button onClick={(e) => handleFilter(e, image)} className="close"> <span> <img style={{ width: "100%" }} src="https://icongr.am/fontawesome/close.svg?size=100&color=currentColor" alt="icon-close" /> </span> </button>
                                                    <img src={`${image}`} alt="" />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                            </div>

                            {leaveState &&
                                <div className="help" onMouseLeave={handleMouseEnter} >
                                    {help}
                                </div>
                            }
                            <div id="divin">
                                <label id="addima" className="labe" >Add Image</label>
                                {Imageload.length >= 15 ? <input id="myInput" value={Input} type="text" onInput={(event) => handleInputChange(event)} onChange={(e) => setInput(e.target.value)} aria-describedby="Ingresar imagen" placeholder="Ingresar imagen" disabled /> :
                                    <input id="myInput" value={Input} type="url" onInput={(event) => handleInputChange(event)} onChange={(e) => setInput(e.target.value)} placeholder="Ingresar URL de imagen" />}
                            </div>
                            {Imageload.length >= 15 ? <button type="submit" disabled>Ingresar</button>
                                : <button type="submit">Ingresar</button>}
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
            }
        </>
    )
}