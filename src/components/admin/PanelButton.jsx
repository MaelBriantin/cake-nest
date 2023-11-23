import styled from "styled-components";
import {theme} from "../../theme/index.js";

export function PanelButton(props) {
    const {text, success, onClick, primary} = props
    return (
        <Button onClick={() => onClick()} $success={success} $primary={primary}>
            { text }
        </Button>
    )
}

const Button = styled.div`
  user-select: none;
  height: 20px;
  background: ${props => props.$success ? theme.colors.success : theme.colors.primary};
  border: 1px solid ${props => props.$success ? theme.colors.success : theme.colors.primary};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: ${theme.borderRadius.round};
  cursor: pointer;
  color: ${theme.colors.white};
  transition: all 200ms;
  &:hover {
    color: ${props => props.$success ? theme.colors.success : theme.colors.primary};
    background: ${theme.colors.white};
  }
`