import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({isisAuthenticated,userRole,children}) => {
    const {role}=useSelector(state=>state.user);
    return isisAuthenticated && role===userRole?children:<Navigate to="/"/>;
};

export default ProtectedRoute;