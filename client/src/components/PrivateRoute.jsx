
// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const { token } = useSelector((state) => state.user)

    if (token !== null) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export default PrivateRoute