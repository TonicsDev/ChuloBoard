function Commands() {
    return(
        <div className="doc">
            <article className="feature">
                <h3 className="feature-title">
                    Crear un nuevo comando
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !comandos crear <span className="highlight">[nombre del comando]</span>  <span className="highlight">[mensaje]</span> -ul <span className="highlight">[nivel de usuario]</span> -cd <span className="highlight">[cooldown]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[nombre del comando]</span> - nombre del comando a crear.
                        </p>
                        <p className="variable-description">
                            <span className="highlight">[mensaje]</span> - el mensaje con el que respondera el bot.
                        </p>
                        <p className="variable-description">
                            <span className="highlight">[nivel de usuario]</span> - nivel de usuario requerido para ejecutar el comando (Propietario, Moderador, Subscriptor, VIP, Cualquiera).
                        </p>
                        <p className="variable-description">
                            <span className="highlight">[cooldown]</span> - tiempo de espera para ejecutar el comando de nuevo. Valores posibles: minimo 5 segundos y maximo 300 segundos.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">!comandos crear !prueba este es un mensaje de prueba -ul Cualquiera -cd 8</p>
                    <p className="example-description">
                        Cuando el comando !prueba sea ejecutado el bot mandara el mensaje
                    </p>
                    <p className="example-response">
                        este es un mensaje de prueba
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    Edita un comando
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !comandos editar <span className="highlight">[nombre del comando]</span>  <span className="highlight">[mensaje]</span> -ul <span className="highlight">[nivel de usuario]</span> -cd <span className="highlight">[cooldown]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[nombre del comando]</span> - nombre del comando a editar.
                        </p>
                        <p className="variable-description">
                            <span className="highlight">[mensaje]</span> - el mensaje con el que respondera el bot.
                        </p>
                        <p className="variable-description">
                            <span className="highlight">[nivel de usuario]</span> - nivel de usuario requerido para ejecutar el comando (Propietario, Moderador, Subscriptor, VIP, Cualquiera).
                        </p>
                        <p className="variable-description">
                            <span className="highlight">[cooldown]</span> - tiempo de espera para ejecutar el comando de nuevo. Valores posibles: minimo 5 segundos y maximo 300 segundos.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <p className="example">!comandos editar !prueba este mensaje de prueba ha sido modificado -ul Subscriptor -cd 6</p>
                    <p className="example-description">
                        Cuando el comando !prueba sea ejecutado el bot mandara el mensaje
                    </p>
                    <p className="example-response">
                        este mensaje de prueba ha sido modificado
                    </p>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    Elimina un comando
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !comandos eliminar <span className="highlight">[nombre del comando]</span>
                    </p>
                    <div className="feature-variables">
                        <h4 className="variables-title">
                            Parametros
                        </h4>
                        <p className="variable-description">
                            <span className="highlight">[nombre del comando]</span> - nombre del comando a eliminar.
                        </p>
                    </div>
                </div>
                <div className="feature-example">
                    <h4 className="example-title">
                        Ejemplo
                    </h4>
                    <div className="example">
                        !comandos eliminar !prueba
                    </div>
                </div>
            </article>
            <article className="feature">
                <h3 className="feature-title">
                    Muestra una lista con los comando disponibles
                </h3>
                <div className="feature-usage">
                    <h4 className="usage-title">
                        Uso
                    </h4>
                    <p className="feature-description">
                        !comandos lista
                    </p>
                </div>
            </article>
        </div>
    )
}

export default Commands;