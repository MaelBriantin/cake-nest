import {Input} from "../../components/global/Input.jsx";
import {MdAlternateEmail} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import {styled} from "styled-components";
import {PanelButton} from "../../components/admin/PanelButton.jsx";
import {useContext, useState} from "react";
import {theme} from "../../theme/index.js";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../api/auth.js";
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {LoginSubtitle} from "../../components/login/LoginSubtitle.jsx";
import {convertApiError} from "../../api/errors.js";
import {getUserMenu} from "../../api/menu.js";
import {StoreContext} from "../../context/StoreContext.jsx";

export const LoginPage = () => {
    const [userConnection, setUserConnection] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setUser} = useContext(UserContext)
    const {setStore, setMenuId} = useContext(StoreContext)
    const navigate = useNavigate()
    const onHandleChange = (type, e) => {
        switch (type) {
            case 'email':
                setUserConnection(prevState => {
                    return {...prevState, email: e.target.value}
                })
                break
            case 'password':
                setUserConnection(prevState => {
                    return {...prevState, password: e.target.value}
                })
                break
        }
    }
    const displayError = (message) => {
        setError(message)
        setTimeout(() => setError(''), 6000)
    }
    const handleConnection = (e) => {
        e.preventDefault()
        if (!loading) {
            if (userConnection.password === '' || userConnection.email === '') {
                displayError('Veuillez remplir tous les champs du formulaire')
            }
            else {
                setLoading(true)
                signInWithEmailAndPassword(auth, userConnection.email, userConnection.password)
                    .then(async (userCredential) => {
                        setUser({
                            name: userCredential.user.displayName,
                            id: userCredential.user.displayName
                        });
                        const menu = await getUserMenu(userCredential.user.uid)
                        setStore(menu.data.menu)
                        setMenuId(menu.id)
                        navigate('/order')
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
            <LoginSubtitle type={'login'}/>
            <CreateAccountPageStyle action={''} onSubmit={(e) => handleConnection(e)}>
                <p>{error !== '' && <span className={'errorMessage'}>{error}</span>}</p>
                <Input placeholder={'Email'} icon={<MdAlternateEmail />} width={'400'} type={'text'} onInput={(e) => onHandleChange('email', e)} value={userConnection.email} />
                <Input placeholder={'Mot de passe'} icon={<RiLockPasswordFill />} width={'400'} type={'password'} onInput={(e) => onHandleChange('password', e)} value={userConnection.password} />
                {/*{*/}
                {/*    !loading && <PanelButton width={'200'} type={'submit'} loading={loading} text={'Se connecter'}*/}
                {/*              onClick={(e) => handleConnection(e)}/>}*/}
                {/*{*/}
                {/*    loading && <p>Chargement</p>*/}
                {/*}*/}
                <PanelButton width={'200'} type={'submit'} loading={loading} text={'Se connecter'}
                             onClick={(e) => handleConnection(e)}/>
                {/*<div className={'noAccount'}>Vous n'avez pas encore de compte ? */}
                <span className={'signUp'} onClick={() => navigate('/signUp')}>Créer un compte</span>
                {/*</div>*/}
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
  .noAccount{
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${theme.colors.white};
    gap: 10px;
  }
  .signUp{
    color: ${theme.colors.primary};
    cursor: pointer;
    transition: all 400ms;
    font-weight: ${theme.fonts.weights.semiBold};
  }
  .signUp:hover{
    text-decoration: underline;
  }
`

