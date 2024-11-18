import { useState } from "react";
import Alert from "react-bootstrap/Alert";

import InfoCircle from "@/assets/icon/infoCircle.svg";
import ExclamationTriangle from "@/assets/icon/exclamationTriangle.svg";
import CheckCircle from "@/assets/icon/CheckCircle.svg";
import CloseIcon from "@/assets/icon/closeIcon.svg";

import useAlert from "@/hooks/useAlert";

const AlertMsg = () => {
    const {type, title, msg} = useAlert();
    const [show, setShow] = useState(true);

    const toggleAlerts = () => {
        setShow(!show);
    }

    const hideAlerts = () => {
        setShow(false);
    }

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

    if(msg !== ""){
        return (
            <>
                <div className="position-fixed end-0 me-5 mt-8 w-40">
                    <Alert 
                        className={`p-2 w-auto bg-${type} border-${type}`} 
                        key={type} 
                        variant={type} 
                        show={show}>

                    <div className="container">
                        <div className="row pt-2">
                            <div className="col-auto">
                                <h3 className="fw-bold float-end">
                                    <img className="px-2 pb-1 align-text-center" src={getIcon()} />
                                    {title}
                                </h3>
                            </div>
                            <div className="col-1">
                                <button type="button" onClick={hideAlerts}>
                                    <img className="alert-close p-1 position-absolute top-0 end-0" src={CloseIcon}></img>
                                </button>
                            </div>
                        </div>
                        <p className="fs-4">
                            {msg}
                        </p>
                    </div>
                        
                    </Alert>
                </div>

                <div className="align-self-center">
                    <button 
                        type="button"
                        className="btn btn-alert bg-primary position-relative"
                        onClick={toggleAlerts}>
                        Alerts 
                        <span className={`position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-${type} p-2`}>
                            <span className="visually-hidden">New Alerts</span>
                        </span>
                    </button>
                </div>
            </>
        ); 
    } else{
        <>
        </>
    }
    
}

export default AlertMsg;