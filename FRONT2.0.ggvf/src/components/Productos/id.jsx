import './id.css'


const Id = (props) => {

  
    
    return (
        <div className="container-Id">
            <div className="container-nameProduc">Name: {props.nameProduc} :<span> </span></div>
            <div className="container-id">ID: {props.id}</div>
            <div className="container-title">precio: ${props.price}</div>
            <div className="container-description">cantidad: {props.amount}</div>
            <td> <img src={props.name} className="img-fluid" alt="..."></img></td>
           
        </div>
    )
}

export default Id;