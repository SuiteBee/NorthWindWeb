//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import InfoCircle from "@/assets/icon/infoCircle.svg";
import ExclamationTriangle from "@/assets/icon/exclamationTriangle.svg";
import CheckCircle from "@/assets/icon/CheckCircle.svg";
import CloseIcon from "@/assets/icon/closeIcon.svg";

//////////////////////////////////////////
//Bootstrap
//////////////////////////////////////////
import Alert from "react-bootstrap/Alert";

const AlertMsg = () => {
    const {type, title, msg, show, setShow} = useAlert();

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
                <div className="position-absolute end-0 top-120 me-3">
                    <Alert 
                        className={`p-2 w-auto bg-${type} border-dark border-2`} 
                        key={type} 
                        variant={type} 
                        show={show}>

                    <div className="container text-dark">
                        <div className="row pt-2">
                            <div className="col-auto">
                                <h3 className="fw-bold float-end">
                                    <img className="px-2 pb-1 align-text-bottom" src={getIcon()} />
                                    {title}
                                </h3>
                            </div>
                            <div className="col-1">
                                <button type="button" onClick={hideAlerts}>
                                    <img className="alert-close p-1 position-absolute top-0 end-0" src={CloseIcon}></img>
                                </button>
                            </div>
                        </div>
                        {msg}
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