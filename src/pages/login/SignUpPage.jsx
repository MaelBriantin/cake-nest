import {Input} from "../../components/global/Input.jsx";
import {MdAccountCircle, MdAlternateEmail} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import {styled} from "styled-components";
import {PanelButton} from "../../components/admin/PanelButton.jsx";
import {useContext, useState} from "react";
import {theme} from "../../theme/index.js";
import {browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, updateProfile} from "firebase/auth";
import {auth} from "../../api/auth.js";
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {LoginSubtitle} from "../../components/login/LoginSubtitle.jsx";
import {convertApiError} from "../../api/errors.js";
import {createUserMenu, getUserMenu} from "../../api/menu.js";
import {StoreContext} from "../../context/StoreContext.jsx";
import {CartContext} from "../../context/CartContext.jsx";

export const SignUpPage = () => {
    const [userCreation, setUserCreation] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    })
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {setStore, setMenuId} = useContext(StoreContext)
    const {setCart} = useContext(CartContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const onHandleChange = (type, e) => {
        switch (type) {
            case 'email':
                setUserCreation(prevState => {
                    return {...prevState, email: e.target.value}
                })
                break
            case 'password':
                setUserCreation(prevState => {
                    return {...prevState, password: e.target.value}
                })
                break
            case 'confirmPassword':
                setUserCreation(prevState => {
                    return {...prevState, confirmPassword: e.target.value}
                })
                break
            case 'username':
                setUserCreation(prevState => {
                    return {...prevState, username: e.target.value}
                })
                break
        }
    }
    const displayError = (message) => {
        setError(message)
        setTimeout(() => setError(''), 6000)
    }
    const handleCreateAccount = (e) => {
        e.preventDefault()
        if (!loading) {
            //setLoading(true)
            if (userCreation.password === '' || userCreation.confirmPassword === '' || userCreation.email === '' || userCreation.username === '') {
                displayError('Veuillez remplir tous les champs du formulaire')
            }
            else if (userCreation.password.length < 6) {
                displayError('Le mot de passe doit contenir au moins 6 caractères')
            }
            else if (userCreation.confirmPassword !== userCreation.password) {
                displayError('Erreur de confirmation de mot de passe')
            }
            else {
                setLoading(true)
                setPersistence(auth, browserSessionPersistence)
                    .then(() => {
                        createUserWithEmailAndPassword(auth, userCreation.email, userCreation.password)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                updateProfile(user, {
                                    displayName: userCreation.username
                                })
                                    .then(async () => {
                                        setUser({
                                            name: user.displayName,
                                            id: user.uid
                                        });
                                        createUserMenu(user.uid)
                                        const menu = await getUserMenu(user.uid).then(r => r)
                                        setStore(menu.data?.menu)
                                        setCart(menu.data?.cart)
                                        setMenuId(menu.id)
                                        navigate('/order')
                                    })
                                    .catch((error) => {
                                        console.error('Erreur lors de la mise à jour du profil :', error);
                                        setLoading(false)
                                    });
                            })
                            .catch((error) => {
                                displayError(convertApiError(error.code))
                                setLoading(false)
                                // displayError(error.code)
                            })
                    })
                    .catch((error) => {
                        displayError(convertApiError(error.code))
                        // displayError(error.code)
                        setLoading(false)
                    });
            }
        }
    }

    return (
        <>
            <LoginSubtitle type={'signin'}/>
            <CreateAccountPageStyle action={''} onSubmit={(e) => handleCreateAccount(e)}>
                <p>{error !== '' && <span className={'errorMessage'}>{error}</span>}</p>
                <Input placeholder={'Nom d\'utilisateur'} icon={<MdAccountCircle />} width={'400'} type={'text'} onInput={(e) => onHandleChange('username', e)} value={userCreation.username} />
                <Input placeholder={'Email'} icon={<MdAlternateEmail />} width={'400'} type={'text'} onInput={(e) => onHandleChange('email', e)} value={userCreation.email} />
                <Input placeholder={'Mot de passe'} icon={<RiLockPasswordFill />} width={'400'} type={'password'} onInput={(e) => onHandleChange('password', e)} value={userCreation.password} />
                <Input placeholder={'Confirmer le mot de passe'} icon={<RiLockPasswordFill />} width={'400'} type={'password'} onInput={(e) => onHandleChange('confirmPassword', e)} value={userCreation.confirmPassword} />
                <PanelButton width={'200'} type={'submit'} loading={loading} text={'Créer un compte'}
                              onClick={(e) => handleCreateAccount(e)}/>
                <span className={'login'} onClick={() => navigate('/')}>Se connecter</span>
            </CreateAccountPageStyle>
        </>
    )
}

const CreateAccountPageStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  p{
    height: 30px;
    width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .errorMessage{
    border-radius: ${theme.borderRadius.round};
    padding: 10px;
    text-align: center;
    min-height: 15px;
    min-width: 200px;
    background: ${theme.colors.red};
    color: ${theme.colors.white};
  }
  .login{
    color: ${theme.colors.primary};
    cursor: pointer;
    transition: all 400ms;
    font-weight: ${theme.fonts.weights.semiBold};
  }
  .login:hover{
    text-decoration: underline;
  }
`

