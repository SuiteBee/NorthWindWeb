import React from "react";

//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@root/hooks/useUser";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient as api } from "@root/components/api/NorthWindClient";

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
        api.authenticate("user/authenticate", formState)
        .then(data => {
            //Store user info
            setAuthorizedUser(data.authorizedUser, data.token);

            //Navigate to dashboard
            navigate("/dashboard");
        })
        .catch(error => {
            if([400, 401].includes(error.status)){
                setErrorMsg("Username or password is incorrect.");
            } else{
                setErrorMsg(`${error.message}\nIs the API backend active?`);
            }

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
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="m-3 fs-1 text-center" style={{fontFamily:"poppins"}}>
                        Northwind Employee Sign-In
                    </div>
                    <div className="bg-dark border border-white rounded-4">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex mx-3 mt-3 justify-content-start align-items-center">
                                <div className="col-5 col-sm-4 col-md-3 col-lg-3">
                                    <span>Username</span>
                                </div>
                                <div className="col-7 col-sm-8 col-md-9 col-lg-9">
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
                            <div className="d-flex mx-3 mb-3 justify-content-start align-items-center">
                                <div className="col-5 col-sm-4 col-md-3 col-lg-3">
                                    <span>Password</span>
                                </div>
                                <div className="col-7 col-sm-8 col-md-9 col-lg-9">
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

                    <div className="pt-5 text-center position-absolute w-100" style={{whiteSpace: "pre-wrap", display: `${errorMsg ? "" : "none"}`}}>
                        {errorMsg}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;