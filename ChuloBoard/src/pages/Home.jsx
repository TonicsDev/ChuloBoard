import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import {loadImageShape} from "@tsparticles/shape-image";
import {loadSnowPreset} from "@tsparticles/preset-snow";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import icon from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
function Home() {
    const [init, setInit] = useState(false);
    const user = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
            await loadSnowPreset(engine);
            await loadImageShape(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    function directLogin() {
        if(user.id) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }
    const options = {
        background: {
            color: {
                value: "none"
            }
        }, 
        particles: {
            color: {
                value: "#ffffff",
            },
            move: {
                speed: 6,
                direction: "bottom"
            },
            shape: {
                type: "image",
                options: {
                    image: {
                        src: "https://static-cdn.jtvnw.net/badges/v1/21c67985-f881-4e59-9446-4e74a2b288ff/3",
                        width: 100,
                        height: 100
                    },
                },
            },
            size: {
                value: 10
            }
        }, preset: "snow"};
    return(
        <div className="home">
            {init && 
                <Particles id="tsparticles" options={options}></Particles>
            }
            <div className="presentation">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_35575bb4ba354b69a9b750ce9b2f0963/static/light/3.0" width="100" height="100" alt="logo" className="image" />
                <h1 className="presentation-title">
                    ChuloBoard
                </h1>
            </div>
            <div className="button-box">
                <div className="login-button" onClick={directLogin}>
                    <div className="icon">
                        <img src={icon} width={30} height={30} alt="icon-button" className="icon-image" />
                    </div>
                    <span className="text-button">
                        Acceder
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Home;