import { useEffect, useState } from "react";

const img = [
    " https://icongr.am/devicon/android-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/css3-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/gitlab-original-wordmark.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/go-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/javascript-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/nodejs-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/sequelize-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/visualstudio-plain.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/windows8-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/react-original.svg?size=100&color=currentColor",
].flatMap((image) => [`a|${image}`, `b|${image}`]
).sort(() => Math.random() - 0.5);


export default function Memotest() {
    const [encontrad, setEncontrad] = useState([])
    const [selecionado, setSelecionado] = useState([])

    useEffect(() =>{
if (selecionado.length === 2){
    if(selecionado[0].split("|")[1] === selecionado[1].split("|")[1] ){
        setEncontrad((encontrad)=> encontrad.concat(selecionado))
        setSelecionado([])
    }else{
    setTimeout(() =>    setSelecionado([]), 1000);
}}
    },[selecionado])

    useEffect (() =>{
        if(encontrad.length === img.length){
            alert("you win!!")
            location.reload()
        }
    })

    return (
        <div>
            <ul
                style={{
                    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
                    gap: "24px"
                }}
            >
                {img.map((e) => {
                    const [, url] = e.split("|");
                    return (
                        <li
                        key={e}
                        onClick={() => selecionado.length<2 && setSelecionado((selecionado)=>selecionado.concat(e))}
                            
                            style={{
                                curssor: "pointer", padding: "12px", border: "5px solid #666",
                                borderRadius: "72px"
                            }}  
                        >
                            {selecionado.includes(e) || encontrad.includes(e) ? (

                            <img alt="icon" src={url} />
                    ) : (
                        <img alt="icon" src="https://icongr.am/octicons/search.svg?size=148&color=currentColor" />
                    )}
                        </li>
                    )
                })
                }
            </ul>

        </div>
    )
}