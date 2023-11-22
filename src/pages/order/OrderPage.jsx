import {Link, Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const OrderPage = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const state = location.state
    const handleDisconnect = () => {
        navigate('/')
    }

    useEffect(() => {
        !state && navigate('/')
    }, [state, navigate]);

    return state && (
        <div>
            {/*<h1>Bonjour {state.user}</h1>*/}
            {/*<button onClick={() => handleDisconnect()}>Déconnexion</button>*/}
        </div>
    )
}