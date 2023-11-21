import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {MdAccountCircle, MdKeyboardArrowRight} from "react-icons/md";

export const LoginForm = () => {
    const [user, setUser] = useState('')
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const firstName = e.target.value;
        setUser(firstName);
    }
    const handleConnection = (e) => {
        e.preventDefault()
        if (user !== '') {
            navigate('/order', { state: { user } })
            //setUser('');
        } else {
            alert('Vous devez entrer un prénom pour vous connecter !');
        }

    }
    return (
        <Form>
            <Input>
                <InputIcon><MdAccountCircle /></InputIcon>
                <InputField onChange={handleInputChange} placeholder="Entrez votre prénom..." type="text" value={user} required />
            </Input>
            <PrimaryButton onClick={handleConnection}>Mon espace <MdKeyboardArrowRight style={{marginTop: '4px'}} /></PrimaryButton>
        </Form>
    )
}

const Input = styled.div`
  width: 100%;
  height: 60px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.greyDark};
  gap: 10px;
  cursor: text;
  position: relative;
  border-radius: ${theme.borderRadius.round};
`

const InputIcon = styled.div`
  margin: 0;
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-40%);
  font-size: ${theme.fonts.size.P3};
`

const InputField = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  font-family: 'Open Sans', 'serif';
  font-size: ${theme.fonts.size.P1};
  padding-left: 100px;
  border-radius: ${theme.borderRadius.round};
`

const PrimaryButton = styled.div`
  width: 100%;
  height: 60px;
  text-decoration: none;
  background: ${theme.colors.primary};
  transition: 200ms all;
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fonts.size.P2};
  font-weight: ${theme.fonts.weights.semiBold};
  font-family: 'Open Sans', 'serif';
  cursor: pointer;
  border-radius: ${theme.borderRadius.round};
  
  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
  }
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`