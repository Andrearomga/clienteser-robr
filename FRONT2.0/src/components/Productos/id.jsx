import './id.css'


const Id = (props) => {
    return (
        <div className="container-Id">
            <div className="container-nameProduc">{props.nameProduc} :<span> ⤵️</span></div>
            <div className="container-id">{props.id}</div><br/>
        </div>
    )
}

export default Id;