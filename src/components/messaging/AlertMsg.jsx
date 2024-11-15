import { useState } from "react";
import Alert from "react-bootstrap/Alert";

import InfoCircle from "@/assets/icon/infoCircle.svg";
import ExclamationTriangle from "@/assets/icon/exclamationTriangle.svg";
import CheckCircle from "@/assets/icon/CheckCircle.svg";
import CloseIcon from "@/assets/icon/closeIcon.svg";

import useAlert from "@/hooks/useAlert";

const AlertMsg = () => {
    const {type, title, msg} = useAlert();
    const [show, setShow] = useState(false);

    const showAlerts = () => {
        setShow(true);
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

    if(show){
        return (
            <div className="position-fixed bottom-0 end-0 p-3 w-25">
                <Alert 
                    className={`p-2 w-auto bg-${type} border-${type}`} 
                    key={type} 
                    variant={type} 
                    show={show}
                >
                    <div className="container">
                        <div className="row pt-2">
                            <div className="col-auto">
                                <h2 className="fw-bold float-end">
                                    <img className="p-1 align-text-top text-black" src={getIcon()} />
                                    {title}
                                </h2>
                            </div>
                            <div className="col-1">
                                <button type="button" onClick={hideAlerts}>
                                    <img className="alert-close p-1 position-absolute top-0 end-0" src={CloseIcon}></img>
                                </button>
                            </div>
                        </div>
                        <hr className="text-black"/>
                        <p>
                            {msg}
                        </p>
                    </div>
                    
                </Alert>
            </div>
        );    
    } else if(type !== ""){
        return (
            <div className="position-fixed bottom-0 end-0 p-5">
                <button 
                    type="button"
                    className="btn btn-alert bg-dark text-white position-relative"
                    onClick={showAlerts}>
                    Alerts 
                    <span className={`position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-${type} p-2`}>
                        <span className="visually-hidden">New Alerts</span>
                    </span>
                </button>
            </div>
        );    
    } else{
        <>
        </>
    }
    
}

export default AlertMsg;