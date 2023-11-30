import styled, {keyframes} from "styled-components";
import {theme} from "../../theme/index.js";
import {VscLoading} from "react-icons/vsc";

export function PanelButton(props) {
    const {text, success, onClick, primary, type, loading, width} = props
    return (
        <Button $width={width} $loading={loading} type={type} onClick={!loading ? ((e) => onClick(e)) : () => {}} $success={success} $primary={primary}>
            <button hidden={true} />
            { !loading && text }
            { loading && <VscLoading className={'loading'} /> }
        </Button>
    )
}


const LoadingKeyframe = keyframes`
  to {
    transform: rotate(360deg);
  }
`


const Button = styled.div`
  ${props => props.$width && `width: ${props.$width}px`};
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
  ${props => !props.$loading && ` cursor: pointer;`}
  color: ${theme.colors.white};
  transition: all 200ms;
  &:hover {
    ${props => props.$success && `color: ${theme.colors.success};`}
    ${props => !props.$success && !props.$loading && `color: ${theme.colors.primary};`}
    ${props => !props.$success && props.$loading && `color: ${theme.colors.white};`}
    ${props => !props.$loading && `background: ${theme.colors.white};`}
  }
  .loading{
    animation: ${LoadingKeyframe} 600ms linear infinite;
  }
`
