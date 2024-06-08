function Music() {
    return(
        <div className="doc">
            <article className="feature">
                <h3 className="feature-title">
                    Agregar una nueva canción
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !musica agregar <span className="highlight">[url de youtube/playlist/nombre]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[url de video/playlist/nombre]</span> - url de la cancion, nombre de la canción o playlist a solicitar.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">!musica agregar michael jackson billie jean</p>
                    <p className="example-description">
                        Cuando sea ejecutado se agregara la canción a la lista y devolvera el siguiente mensaje
                    </p>
                    <p className="example-response">
                        Michael Jackson - Billie Jean (Official Video) ha sido agregada a la lista de reproducción en la posición #1
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    Saltar la canción actual
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !musica saltar
                    </p>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">!musica saltar</p>
                    <p className="example-description">
                        Cuando el comando !saltar sea ejecutado se eliminara la canción que se este reproduciendo
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    mover una canción al principio de la lista de reproducción
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !musica promover <span className="highlight">[posición]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[posición]</span> - posición actual de la canción en la lista de reproducción.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">
                        !musica promover 5
                    </p>
                    <p className="example-description">
                        Si hay más de 5 canciones en la lista, movera la canción que se encuentre en la 5 posición a la primera posición.
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    Muestra la canción que se esta reproduciendo actualmente
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !musica actual
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                   Eliminar una canción
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !musica eliminar <span className="highlight">[posición]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[posición]</span> - posición actual de la canción en la lista de reproducción.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">
                        !musica eliminar 4
                    </p>
                    <p className="example-description">
                        Eliminara la canción que se encuentre en la posición 4 de la lista.
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    Pausar la canción actual
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !musica pausar 
                    </p>
                    <div className="feature-example">
                        <h4 className="example-title">
                            Ejemplo
                        </h4>
                        <p className="example">
                            !musica pausar 
                        </p>
                        <p className="example-description">
                            Para que el comando funcione debe tener abierto su dashboard en la lista de reproducción es decir en
                            https://chuloboard.vercel.app/dashboard/music
                        </p>
                    </div>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                   Despausar la canción actual
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !comandos play
                    </p>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">
                        !comandos play
                    </p>
                    <p className="example-description">
                        Para que el comando funcione debe tener abierto su dashboard en la lista de reproducción es decir en
                        https://chuloboard.vercel.app/dashboard/music
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                   Despausar la canción actual
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !comandos volumen <span className="highlight">[porcentaje]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[porcentaje]</span> - porcentaje de volumen deseado.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">
                        !comandos volumen 50%
                    </p>
                    <p className="example-description">
                        Al ejecutar este comando el volumen se establecera en 50%.
                        <br/>
                        <br/>
                        Para que el comando funcione debe tener abierto su dashboard en la lista de reproducción es decir en
                        https://chuloboard.vercel.app/dashboard/music
                    </p>
                </div>
            </article>
        </div>
    )
}

export default Music;