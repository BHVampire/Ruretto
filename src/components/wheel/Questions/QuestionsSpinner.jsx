import { useContext } from 'react'
import useSpinner from '../../../hooks/useSpinner'
import { DataContext } from '../../../store/DataProvider'
import QuestionsWheel from './QuestionsWheel'
import ControlledText from "react-controlled-text";


const QuestionsSpinner = ({ pageID }) => {
    const { data } = useContext(DataContext)

    //Cree un hook para manejar los eventos del giro de la rueda y el elemento seleccionado.
    
    // [ Datos para proveer la rueda, Ángulo al que la rueda debe rotar al hacer clic, Acción para comenzar la rotación, Verdadero si la rueda está girando, elemento o pregunta seleccionada al azar ]
    const [wheelElements, rotation, rotate, isRotating, question] = useSpinner(data, pageID)
    return (
        <div className="spinner">
            <div className="result">
                <div style={{ width: '100%', height: 80 }}>
                    <ControlledText fontSizeMin={12} fontSizeMax={100} clampSuffix={"..."}>
                        {question}
                    </ControlledText>
                </div>
            </div>

            <QuestionsWheel
                data={wheelElements}
                rotation={rotation}
                rotate={rotate}
                isRotating={isRotating}
            />
        </div>
    )
}

export default QuestionsSpinner
