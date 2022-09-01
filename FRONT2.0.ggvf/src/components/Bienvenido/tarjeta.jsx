import { Link, useNavigate } from "react-router-dom";
import tarjeta from "./tarjeta.module.css";
import ima from "../../assets/img/env.png";

const Tarjeta = () => {

    return (
        <div className={tarjeta.pw}>
            <section className={tarjeta.box}>
        <img src={ima} />
        <p>We have sent a password recover instructions to your email</p>

        </section>

        </div>
        
    )
    
}

export default Tarjeta;