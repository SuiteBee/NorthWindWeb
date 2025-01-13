import { createContext, useState } from 'react';

const initialState = {
  empId: -1,
  user: "",
  firstName: "",
  lastName: "",
  roleId: -1,
  role: "",

  token: ""
};

const UserContext = createContext({
  ...initialState,
  logout: () => {},
  setAuthorizedUser: () => {}
});

export const UserProvider = ({ children }) => {
  const nwUser = sessionStorage.getItem("nwUser");
  var sessionUser = "";
  try{
    sessionUser = JSON.parse(nwUser);
  } catch {
    sessionUser = nwUser;
  }
  const sessionToken = sessionStorage.getItem("nwToken");

  const [empId, setEmpId] = useState(sessionUser?.employeeId);
  const [user, setUser] = useState(sessionUser?.userName);
  const [firstName, setFirstName] = useState(sessionUser?.firstName);
  const [lastName, setLastName] = useState(sessionUser?.lastName);
  const [roleId, setRoleId] = useState(sessionUser?.roleId);
  const [role, setRole] = useState(sessionUser?.roleName);

  const[token, setToken] = useState(sessionToken);

  const logout = () => {
    setEmpId(-1);
    setUser("");
    setFirstName("");
    setLastName("");
    setRoleId(-1);
    setRole("");

    setToken("");
  }

  const setAuthorizedUser = (authorizedUser, token) => {
    setEmpId(authorizedUser.employeeId);
    setUser(authorizedUser.userName);
    setFirstName(authorizedUser.firstName);
    setLastName(authorizedUser.lastName);
    setRoleId(authorizedUser.roleId);
    setRole(authorizedUser.roleName);
    sessionStorage.setItem("nwUser", JSON.stringify(authorizedUser));

    setToken(token);
    sessionStorage.setItem("nwToken", token);
  };

  return (
    <UserContext.Provider
      value={{
        empId,
        user,
        firstName,
        lastName,
        roleId,
        role,
        token,
        logout,
        setAuthorizedUser
      }}
    >
        {children}
    </UserContext.Provider>
  );
};

export default UserContext;