import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';  

const isAuthenticated = () => {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
        console.log('Usuário Autenticado...');
        return token;
    } else {
        console.log('Usuário Não Autenticado...');
        return null;
    }
}; 

function Auth({ children }) {
    Auth.propTypes = {
        children: PropTypes.array
    };

    if (isAuthenticated()) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default Auth;
