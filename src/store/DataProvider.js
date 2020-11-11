import {createContext} from 'react'
import useExcelDB from '../hooks/useExcelDB';

export const DataContext = createContext()

const DataProvider = ({children}) => {

    const dataBase = useExcelDB(`./data/data.xlsx`)


    return (
        <DataContext.Provider value={ dataBase }>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
