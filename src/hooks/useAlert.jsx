import { useContext } from "react";
import AlertContext from "@root/contexts/AlertContext";

const useAlert = () => useContext(AlertContext);

export default useAlert;