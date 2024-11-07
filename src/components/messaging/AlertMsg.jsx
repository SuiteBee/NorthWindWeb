import Alert from "react-bootstrap/Alert";

import InfoCircle from "@/assets/icon/infoCircle.svg";
import ExclamationTriangle from "@/assets/icon/exclamationTriangle.svg";
import CheckCircle from "@/assets/icon/CheckCircle.svg";

const AlertMsg = (type, title, msg) => {

    function getIcon(){
        switch(type){
            case "success":
                return CheckCircle;
            case "danger":
                return ExclamationTriangle;
            case "info":
                return InfoCircle;
            default:
                return null;
        }
    }


    return (
        <>
            <Alert 
                className={`p-3 w-auto bg-${type} border-${type}`} 
                key={type} 
                variant={type} 
                dismissible
            >
                <h2 className="fw-bold">
                    <img className="p-1 align-text-top" src={getIcon()} />
                    {title}
                </h2>
                <hr />
                <p>
                    {msg}
                </p>
            </Alert>
        </>
    );    
}

export default AlertMsg;