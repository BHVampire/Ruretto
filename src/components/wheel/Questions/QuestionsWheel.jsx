import arc from 'svg-arc';

const QuestionsWheel = ({ data, rotation, rotate, isRotating }) => {
    const circleRadius = 10


    //Esta es la rueda <3
    return (
        //Es puro código SVG y JSX para las condiciones y acciones
        //Puse el área de trabajo en 24, pesimo error, recomiendo usar 1000 cerrados para trabajar más a gusto, al final me dio pereza transformar las dimensiones.
        //La rueda es escalada a 500px * 500px con CSS, al ser vectores no se deforma.
        <svg className="wheel" viewBox="0 0 24 24">
            {/* La Etiqueta Rotate tiene 3 valores (Angulo, coordenada X, coordenada Y) */}
            {/* Originalmente la rueda debía medir solo 20px, pero agregué un circulo blanco alrededor, por eso le sumo 2 al radio del circulo */}
            {/* Esta es la rueda completa */}
            <g className="wheel-group" transform={`rotate(${- rotation}, ${circleRadius + 2}, ${circleRadius + 2})  translate(2,2)`}>
                {/* Esta es la zona que va a girar v */}
                <g transform={`rotate(${(data[0].end / -2)}, ${circleRadius}, ${circleRadius})`}>
                    <circle
                        r={circleRadius + 2}
                        cx={circleRadius}
                        cy={circleRadius}
                        fill="#ffffff"
                    />
                    <circle
                        r={circleRadius}
                        cx={circleRadius}
                        cy={circleRadius}
                        fill="#e8ecf2"
                    />

                    <circle
                        r={circleRadius * 0.95}
                        cx={circleRadius}
                        cy={circleRadius}
                        fill="white"
                    />

                    <circle
                        r={circleRadius * 0.39}
                        cx={circleRadius}
                        cy={circleRadius}
                        fill="#e8ecf2"
                    />

                    <circle
                        r={circleRadius * 0.2}
                        cx={circleRadius}
                        cy={circleRadius}
                        fill="white"
                    />

                    {
                        //Creo los cuadritos de colores con colores tipo "HSL" y aprovecho el ángulo de cada elemento para darle su color,
                        //además bajo la saturación e iluminación en caso de que el elemento ya no tenga vidas
                        //Uso el paquete npm "arc", pasé 2 días tratando de hacer un semicirculo con vectores y no pude, se necesita ser un experto
                        //en geometría analítica, por suerte encontré este paquete maravilloso y desconocido que evitó que me quedara calvo por el estres.
                        data.map(e => (
                            <path
                                className="wheel-elements"
                                key={e.id}
                                fill={`hsl(${e.start}, ${e.lives > 0 ? '100%' : '0%'}, ${e.lives > 0 ? '65%' : '20%'})`}
                                d={arc({
                                    x: circleRadius,
                                    y: circleRadius,
                                    r: circleRadius * 0.7,
                                    R: circleRadius * 0.94,
                                    start: e.start,
                                    end: e.end,
                                })} />
                        ))
                    }

                    {
                        /* Cuadritos grises */
                        data.map(e => (
                            <path
                                key={e.id}
                                fill="#231f20"
                                d={arc({
                                    x: circleRadius,
                                    y: circleRadius,
                                    r: circleRadius * 0.4,
                                    R: circleRadius * 0.69,
                                    start: e.start + 0.5,
                                    end: e.end - 0.5,
                                })} />
                        ))
                    }

                    {
                        /* Números */
                        data.map(e => (
                            <text
                                key={e.id}
                                dx="10"
                                dy="2.25"
                                fontFamily="Verdana"
                                fontSize="1"
                                fontWeight="bold"
                                textAnchor="middle"
                                fill="black"
                                transform={`rotate(${(e.start + e.end) / 2}, ${circleRadius}, ${circleRadius})`}
                            >
                                {e.index}
                            </text>
                        ))
                    }
                </g>
            </g>

            {/* Botón de colores, ignoren los Path, se hicieron con un software para diseño de vectores, es humanamente imposible hacerla con puro código, el botón no lo hice yo :p */}
            <g
                transform={`rotate(${rotation}, ${circleRadius + 2}, ${circleRadius + 2})`}
                className="wheel-button"
                onClick={isRotating ? null : rotate}
            >
                <path d="M8.158 11.607c.347-.377 1.05-.94 2.04-.75 1.282.2 1.803 1.137 1.803 1.137s-1.308.064-2.044 1.193c-.35.588-.426 1.3-.206 1.95-.117-.084-.228-.174-.335-.27a3.86 3.86 0 0 1-1.258-3.261z" fill="#ffcb02" />
                <path d="M12.08 9.88c.464 1.21-.087 2.133-.087 2.133s-.708-1.102-2.052-1.175a2.34 2.34 0 0 0-1.786.793c.132-1.374.987-2.574 2.243-3.148.497.11 1.35.434 1.683 1.397z" fill="#ff9e02" />
                <path d="M13.875 11.01c-.817 1.008-1.89.992-1.89.992s.6-1.162-.008-2.365c-.335-.6-.915-1.02-1.587-1.152 1.257-.575 2.724-.436 3.85.366.157.485.302 1.385-.367 2.158z" fill="#ff4b42" />
                <path d="M13.8 13.122c-1.282-.204-1.804-1.142-1.804-1.142s1.31-.062 2.043-1.2a2.34 2.34 0 0 0 .208-1.942 3.98 3.98 0 0 1 .348.279 3.86 3.86 0 0 1 1.262 3.229c-.34.376-1.05.958-2.057.764z" fill="#c063d6" />
                <path d="M11.91 14.12c-.464-1.21.087-2.133.087-2.133s.704 1.077 2.05 1.15a2.37 2.37 0 0 0 1.802-.79 3.87 3.87 0 0 1-2.252 3.172c-.497-.11-1.348-.433-1.685-1.398z" fill="#17a4f6" />
                <path d="M9.736 15.128c-.16-.487-.306-1.368.355-2.13.817-1.008 1.914-1.003 1.914-1.003s-.582 1.155.027 2.355c.332.6.91 1.023 1.58 1.162-1.266.58-2.746.434-3.875-.382z" fill="#4fca24" />
            </g>


            <g>
                {/* Hice la flechita con Inkscape, y la ruedita la agrupé para que girara igual que el botón central */}
                <path d="M11.24 1.526l.675.893c.02.026.05.042.084.042s.064-.015.084-.042l.675-.893A.952.952 0 0 0 11.359.249a.952.952 0 0 0-.118 1.277zM12 .45a.49.49 0 0 1 .453.302c.076.183.034.394-.108.534s-.35.182-.534.108a.49.49 0 0 1 .188-.943z" fill="#040005" />
                <g
                    className="wheel-arrow-color"
                    strokeWidth=".01"
                    transform={`rotate(${rotation}, ${11.999646}, ${0.94578372})`}
                >
                    <path d="M11.14.858a.49.49 0 0 1 .457-.168c.287.045.403.254.403.254s-.293.014-.458.267c-.078.132-.095.29-.046.436-.026-.02-.05-.04-.075-.06a.864.864 0 0 1-.282-.73z" fill="#ffcb02" stroke="#ffcb02" />
                    <path d="M12.018.472c.104.27-.02.477-.02.477s-.158-.246-.46-.263a.524.524 0 0 0-.4.178.865.865 0 0 1 .502-.705c.112.024.302.097.377.313z" fill="#ff9e02" stroke="#ff9e02" />
                    <path d="M12.42.725c-.183.226-.423.222-.423.222s.135-.26-.002-.53a.52.52 0 0 0-.355-.258.865.865 0 0 1 .862.082.49.49 0 0 1-.082.483z" fill="#ff4b42" stroke="#ff4b42" />
                    <path d="M12.4 1.197c-.287-.046-.404-.255-.404-.255s.293-.014.457-.266A.524.524 0 0 0 12.5.241a.891.891 0 0 1 .078.062.864.864 0 0 1 .283.723c-.076.084-.235.214-.46.17z" fill="#c063d6" stroke="#c063d6" />
                    <path d="M11.98 1.42c-.104-.27.02-.477.02-.477s.158.24.46.257a.531.531 0 0 0 .403-.177c-.028.3-.22.58-.504.7-.112-.024-.302-.097-.377-.313z" fill="#17a4f6" stroke="#17a4f6" />
                    <path d="M11.493 1.647c-.036-.11-.068-.306.08-.477.183-.226.43-.225.43-.225s-.13.26.006.527c.074.134.203.23.354.26a.865.865 0 0 1-.868-.085z" fill="#4fca24" stroke="#4fca24" />
                </g>
            </g>
        </svg >
    )
}

export default QuestionsWheel
