import React from "react";

//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@/hooks/useUser";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";

const Login = () => {
    const[errorMsg, setErrorMsg] = useState("");
    const[formState, setFormState] = useState({
        usr: "",
        pwd: ""
    });

    const navigate = useNavigate();
    const { setAuthorizedUser } = useUser();

    function HandleFormChange(event){
        setErrorMsg("");

        const value = event.target.value;
        setFormState({
            ...formState,
            [event.target.name]: value
        });
    }

    function handleSubmit(event){
        //Authenticate user
        NorthWindClient.authenticate("user/authenticate", formState)
        .then(data => {
            //Store user info
            setAuthorizedUser(data.authorizedUser, data.token);

            //Navigate to dashboard
            navigate("/dashboard");
        })
        .catch(error => {
            setErrorMsg("Username or password is incorrect.");

            //clear password
            setFormState({
                ...formState,
                ["pwd"]: ""
            });
        });
    }

    return (
        <>
            <div className="loginBack">
                <div className="w-20 position-absolute top-50 start-50 translate-middle">
                    <div className="m-3 fs-1 text-center" style={{fontFamily:"poppins"}}>
                        Northwind Employee Sign-In
                    </div>
                    <div className="bg-dark border border-white rounded-4">
                        <form onSubmit={handleSubmit}>
                            <div className="d-inline-flex ps-6 mx-3 mt-3" style={{alignItems:"center", justifyItems:"left"}}>
                                <div className="col-4">
                                    <span>Username:</span>
                                </div>
                                <div className="col-8">
                                    <div className="input-group">                                      
                                        <input 
                                            type="text"
                                            className="form-control fs-3 loginField"
                                            id="usr" 
                                            name="usr"
                                            value={formState.usr}
                                            onChange={HandleFormChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="w-100" />
                            <div className="d-inline-flex px-6 mx-3 mb-3" style={{alignItems:"center", justifyItems:"left"}}>
                                <div className="col-4">
                                    <span>Password:</span>
                                </div>
                                <div className="col-8">
                                    <div className="input-group">
                                        <input 
                                            type="password"
                                            className="form-control fs-3 loginField"
                                            id="pwd" 
                                            name="pwd"
                                            value={formState.pwd}
                                            onChange={HandleFormChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="d-flex p-3 justify-content-end">
                        <button 
                            type="button" 
                            className="btn btn-success btn-long"
                            onClick={handleSubmit}>
                            Login
                        </button>
                    </div>

                    <div className="pt-5 text-center" style={{display: `${errorMsg ? "" : ""}`}}>
                        {errorMsg}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;