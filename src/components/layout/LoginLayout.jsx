import { useContext } from "react"
import { Login, LoginContext } from "../login"

export const LoginLayout = ( { children } ) => {
    const { logged } = useContext(LoginContext);
    return (
        logged ? children : <Login />
    )
}