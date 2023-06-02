import React from "react"
import { Link } from "react-router-dom"
import style from "./Homepage.module.css"

export default function HomePage() {

    return (

        <div>
            <div className={style.container}>
                <Link to="/memotest"  >
                    <button>
                        <span>memotest</span>
                    </button>
                </Link>
                <Link to="/pokemon"  >
                    <button>
                        <span>Pokemon</span>
                    </button>
                </Link>
                <Link to="/palabrasporminuto"  >
                    <button>
                        <span>WordForMinutes</span>
                    </button>
                </Link>
            </div>

        </div>
    )
}