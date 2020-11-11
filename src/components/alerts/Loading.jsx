import {ReactComponent as LoadingIcon} from '../../assets/icons/loadingIcon.svg'

const Loading = () => {
    return (
        <div
            className="row"
            style={{
                margin: '40vh 20vw',
                height: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                userSelect: 'none'
            }}
        >

            <div className="col s3">
                <LoadingIcon stroke="#fff" />
            </div>

            <div className="col s9" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 50, fontWidth: 'bold' }} >Cargando...</div>
            </div>

        </div>
    )
}

export default Loading
