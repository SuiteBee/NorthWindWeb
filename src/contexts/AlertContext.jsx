import { createContext, useState } from 'react';

const initialState = {
  type: "",
  title: "",
  msg: "",
  show: true
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
  const [show, setShow] = useState(true);

  const clearAlert = () => {
    setType("");
    setTitle("");
    setMsg("");
    setShow(false);
  }

  const setAlert = (type, title, msg) => {
    setType(type);
    setTitle(title);
    setMsg(msg);
    setShow(true);
  };

  return (
    <AlertContext.Provider
      value={{
        type,
        title,
        msg,
        show,
        setShow,
        setAlert,
        clearAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;