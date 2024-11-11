import { createContext, useState } from 'react';

const initialState = {
  type: "",
  title: "",
  msg: ""
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
  clearAlert: () => {}
});

export const AlertProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  const clearAlert = () => {
    setType("");
    setTitle("");
    setMsg("");
  }

  const setAlert = (type, title, msg) => {
    setType(type);
    setTitle(title);
    setMsg(msg);
  };

  return (
    <AlertContext.Provider
      value={{
        type,
        title,
        msg,
        setAlert,
        clearAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;