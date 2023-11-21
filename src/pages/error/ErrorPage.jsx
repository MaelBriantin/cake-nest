import {Navigate, useNavigate} from "react-router-dom";

export const ErrorPage = () => {
    const navigate = useNavigate();
    const handleReturnHome = () => {
        navigate('/');
    }
    return (
        <>
            <button onClick={() => handleReturnHome()}>Retourner vers la page d'accueil</button>
        </>
    )
}