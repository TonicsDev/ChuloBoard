import { useState, useEffect, PureComponent } from "react";
import axios from "axios";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadStarsPreset} from "@tsparticles/preset-stars";
import { loadFull } from "tsparticles";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
function Login() {
    const [init, setInit] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadStarsPreset(engine);
            await loadSnowPreset(engine);
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    
    const options = { background: {
        color: {
            value: "#000000"
        }
    }, preset: "snow"};
    
    function login(e) {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}auth`, {username: e.target.username.value, password: e.target.password.value}).then(res => {
            return navigate("/dashboard/customs");
        }).catch(error => {
            return console.error(error);
        });
    }
    return(
        <div className="login">
            {
                init && <Particles id="tsparticles" options={options}/>
            }
            <div className="form-box">
                <div className="form-header">
                    <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_35575bb4ba354b69a9b750ce9b2f0963/static/light/3.0" width={100} height={100} alt="logo" className="logo-image" />
                    <h3 className="form-title">
                        ChuloBoard
                    </h3>
                </div>
                <form className="form-body" onSubmit={login}>
                    <div className="input-group">
                        <div className="input-container">
                            <input type="text" name="username" id="username" className="text-input" placeholder="Nombre de usuario"/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-container">
                            <input type="password" name="password" id="password" className="text-input" placeholder="Contraseña"/>
                        </div>
                    </div>
                    <div className="input-footer">
                        <button className="button-input" type="submit">
                            Acceder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;