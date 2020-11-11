import { useEffect, useRef, useState } from 'react'

const useSpinner = (data, pageID) => {

    //Demasiados useState, lo hice con prisa, no hagan caso a este horror.
    const [actualElementData, setActualElementData] = useState([...data])
    const [question, setQuestion] = useState('')
    const [rotation, setRotation] = useState(0)
    const [isRotating, setIsRotating] = useState(false)
    const [toTheLeft, setToTheLeft] = useState(true)
    const [positionArray, setPositionArray] = useState([])

    //Creo un Timmer con una referencia a la que podré llamar desde cualquier parte, es necesario para poder eliminar el timer cuando el componente es desmontado.
    //Esto es porque si la rueda está girando y cambias de página, el timer sigue funcionando aunque el componente esté demsontado, y al finalizar trata de actualizar un State que ya no existe.
    const clearTimer = useRef(null)

    //Deshabilito es-lint para evitar la alerta de que faltan dependencias, si agrego las dependencias el código ya no funciona.
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        let temp = []

        for (let i = 0; i < actualElementData[pageID].elements.length; i++) {
            temp.push(i)
        }

        setPositionArray(temp)

        for (const actualElement in data[pageID].elements) {
            setActualElementData([
                ...actualElementData,
                actualElementData[pageID].elements[actualElement].lives = 1
            ])
        }

    }, [])
    /* eslint-enable react-hooks/exhaustive-deps */

    //Un useEffect para limpiar el timer cuando el componente es desmontado.
    useEffect(() => {
        return () => {
            clearTimeout(clearTimer.current)
        }
    }, [])


    //Esta función se activa al presionar el botón, gira la ruleta al ángulo 3600 + la posición del elemento ganador si gira a la derecha,
    //o al ángulo 0 + posición del elemento ganador si gira a la izquierda.
    //Se ve bonito que gire a un lado y luego al otro, además me evito tener que reiniciar el ángulo si girara siemrpe hacia un solo lado, el número crecería mucho.

    const rotationHandler = () => {

        if (positionArray.length > 0) {
            //Cree un array con las posiciones de los elementos, cuando se selecciona un elemento al azar se quita del array.
            const randomNumber = Math.floor(Math.random() * ((positionArray.length - 1) + 1))
            const actualElement = positionArray[randomNumber]
            const actualPosition = actualElementData[pageID].elements[actualElement].start

            setPositionArray(positionArray.filter(x => x !== actualElement))

            if (toTheLeft) {
                setRotation(3600 + actualPosition)
                setToTheLeft(false)
            } else {
                setRotation(actualPosition)
                setToTheLeft(true)
            }

            setIsRotating(true)

            //Este timer define cuando se termina el tiempo de giro, al finalizar se le quita una "vida" al elemento seleccionado para que no se vuelva a utilizar.
            //Son idas porque orignalmente planeaba agregar una ruleta extra pero con los nombres de los alumnos, si uno perdia se le quitaba una vida, si ganaba
            //se aumentaba en 1 su vida para dejar al final del juego al 1er, 2do y 3er lugar.
            clearTimer.current = setTimeout(() => {
                setActualElementData([
                    ...actualElementData,
                    actualElementData[pageID].elements[actualElement].lives = actualElementData[pageID].elements[actualElement].lives - 1
                ])
                setIsRotating(false)
                setQuestion(actualElementData[pageID].elements[actualElement].name)
            }, 5000)
        }
    }

    // [ Datos para proveer la rueda, Ángulo al que la rueda debe rotar al hacer clic, Acción para comenzar la rotación, Verdadero si la rueda está girando, elemento o pregunta seleccionada al azar ]
    return [actualElementData[pageID].elements, rotation, () => rotationHandler(), isRotating || positionArray.length <= 0, question]
}

export default useSpinner
