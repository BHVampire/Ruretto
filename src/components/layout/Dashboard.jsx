import { useParams } from 'react-router-dom'
import QuestionsSpinner from '../wheel/Questions/QuestionsSpinner'
import { Fragment } from 'react'

const Dashboard = () => {

    const { pageID } = useParams()

    return (
        <Fragment>
            {
                pageID
                    ?
                    <QuestionsSpinner key={pageID} pageID={pageID} />
                    :                    
                    '' 
            }
        </Fragment>
    )
}

export default Dashboard
