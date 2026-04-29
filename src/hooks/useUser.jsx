import { useContext } from "react";
import UserContext from "@root/contexts/UserContext";

const useUser = () => useContext(UserContext);

export default useUser;