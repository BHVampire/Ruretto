import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import XLSX from 'xlsx'

const useExcelDB = ( url ) => {

    const [state, setState] = useState({ data: null, isLoading: true, error: false })

    //La mayoría del código es para convertir Filas a Columnas de los datos obtenidos del Excel, mero capricho.
    useEffect(() => {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(data => XLSX.read(data, { type: 'array' }))
            .then(data => XLSX.utils.sheet_to_json(data.Sheets['data'], { type: 'array' }))
            .then(data => {
                const topicList = Object.getOwnPropertyNames(data[0])

                let rowToColumn = []

                for (let element = 1; element < topicList.length; element++) {
                    rowToColumn.push({
                        topic: topicList[element],
                        elements: data
                            .map(e => e[topicList[element]])
                            .filter(e => e)
                    })
                }

                rowToColumn = rowToColumn.map(elementInData => ({
                    topic: elementInData.topic,
                    elements: elementInData.elements.map((e, index) => ({
                        id: uuid(),
                        index: index + 1,
                        name: e,
                        lives: 1,
                        start: index * (360 / elementInData.elements.length),
                        end: (index + 1) * (360 / elementInData.elements.length)
                    }))
                }))

                return rowToColumn

            })
            .then(data => setState({
                isLoading: false,
                error: false,
                data
            }))
            .catch(error => {
                console.log(error)
                setState({
                    data: null,
                    isLoading: true,
                    error: true
                })
            })
    }, [url])

    return state
}

export default useExcelDB