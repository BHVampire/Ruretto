import { ErrorSharp } from '@material-ui/icons'

const Error = () => {
    return (
        <div
            className="row"
            style={{
                margin: '40vh 20vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                userSelect: 'none'
            }}
        >

            <div className="col s3">
                <ErrorSharp style={{ fontSize: 100 }} />
            </div>

            <div className="col s9" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 50, fontWidth: 'bold' }} >Error</div>
                <div style={{ fontSize: 20, fontWidth: 'bold' }}>Ha ocurrido un problema al cargar la base de datos...</div>
                <div style={{ fontSize: 14, fontWidth: 'bold' }}>Contacta al equipo de estrategia educativa.</div>
            </div>

        </div>
    )
}

export default Error
