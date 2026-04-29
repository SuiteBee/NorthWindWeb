//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@root/hooks/useUser";

const Logout = () => {
    const [timeToLogout, setTimeToLogout] = useState(5);

    const { logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        //Clear user session immediately
        logout();
        
        const timer = setInterval(() => {
            setTimeToLogout((prevSeconds) => {
                if(prevSeconds === 0){                      
                    //Navigate to login page
                    navigate("/");
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="p-5">
                <div className="d-flex align-items-baseline">
                    <h1 className="pe-3">Logging Out</h1>
                    <div className="spinner-border" role="status" />
                </div>

                <div>
                    You will be redirected back to login page in {timeToLogout} seconds.
                </div>
            </div>
        </>
    );
};

export default Logout;