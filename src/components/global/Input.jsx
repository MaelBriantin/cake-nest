import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {useContext, useEffect, useRef, useState} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export function Input(props) {
    const [hidden, setHidden] = useState(true)
    const {placeholder, icon, width, type, value, onInput, error, firstInput } = props
    const {openedPanel} = useContext(AdminContext)
    const {selectedItem} = useContext(StoreContext)
    const inputRef = useRef(null);
    useEffect(() => {
       (firstInput && !openedPanel)  && setTimeout(() =>
           inputRef.current.focus(), 400)
    }, [selectedItem]);
    return (
        <InputStyle $width={width} $error={error}>
            <span>{icon}</span>
            {
                (type === 'password' && hidden) && <Hide onClick={() => setHidden(!hidden)}><FaEye /></Hide>
            }
            {
                (type === 'password' && !hidden) && <Hide onClick={() => setHidden(!hidden)}><FaEyeSlash /></Hide>
            }
            <input ref={inputRef} placeholder={placeholder} type={(type === 'password' && hidden) ? type : 'text'} onInput={(e) => onInput(e)} value={value}/>
        </InputStyle>
    )
}

const InputStyle = styled.div`
  width: ${props => props.$width}px;
  height: 40px;
  border-radius: ${theme.borderRadius.round};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.greyDark};
  cursor: text;
  position: relative;
  border-radius: ${theme.borderRadius.round};
  border: solid 4px ${props => !props.$error ? theme.colors.greyLight : theme.colors.red} ;
  background: ${theme.colors.greyLight};
  transition: all 400ms;
  //position: relative;
  input{
    color: ${theme.colors.greyDark};
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', 'serif';
    font-size: ${theme.fonts.size.P1};
    padding-left: 50px;
    //border-radius: ${theme.borderRadius.round};
    background: ${theme.colors.greyLight};
  }
  span{
    position: absolute;
    top: 50%;
    transform: translateY(-45%);
    left: 20px;
  }
  &:focus-within{
    border: ${theme.colors.primary} 4px solid;
  }
`
const Hide = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  right: 20px;
`