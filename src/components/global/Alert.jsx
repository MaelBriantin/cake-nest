import styled from "styled-components";

export function Alert(props) {
    const {icon, color, message} = props
    return (
        <AlertStyle $color={color}>
            <span>
                {icon}
            </span>
            <p>
                {message}
            </p>
        </AlertStyle>
    )
}

const AlertStyle = styled.div`
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  height: 40px;
  color: ${props => props.$color};
`