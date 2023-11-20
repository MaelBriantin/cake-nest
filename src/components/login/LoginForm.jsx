import {useState} from "react";

export const LoginForm = () => {
    const [user, setUser] = useState('')
    const handleInputChange = (e) => {
        const firstName = e.target.value;
        setUser(firstName);
    }
    const handleConnection = (e) => {
        e.preventDefault()
        if (user !== '') {
            alert(`Bonjour ${user}`);
            setUser('');
        } else {
            alert('Vous devez entrer un prénom pour vous connecter !');
        }

    }
    return (
        <form>
            <input onChange={handleInputChange} placeholder="Entrez votre prénom..." type="text" value={user} required/>
            <button onClick={handleConnection}>Accédez à votre espace</button>
        </form>
    )
}