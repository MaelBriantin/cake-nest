import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Button} from "../global/Button.jsx";
import {formatPrice} from "../../utils/maths.js"
import {TiDelete} from "react-icons/ti";
import {useContext} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";

export const CakeCard = (props) => {
    const {adminMode} = useContext(AdminContext)
    const {store, setStore} = useContext(StoreContext)
    const {image, title, price, id} = props
    const handleDelete = (id) => {
        const newStore = store.filter(item => item.id !== id)
        setStore(newStore)
    }
    return (
        <Card>
            <CardImage><img src={image} alt={''}/></CardImage>
            <BottomCard>
                {adminMode && <RemoveButton onClick={() => handleDelete(id)}><TiDelete/></RemoveButton>}
                <CardTitle>{title}</CardTitle>
                <CardSubTitle>
                    <p>{formatPrice(price)}</p>
                    <Button style={'primary'} size={'small'} value={'Ajouter'}></Button>
                </CardSubTitle>
            </BottomCard>
        </Card>
    )
}

const RemoveButton = styled.div`
  font-size: ${theme.fonts.size.P4};
  color: ${theme.colors.primary};
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    color: ${theme.colors.redSecondary};
  }
`

const Card = styled.div`
  user-select: none;
  position: relative;
  align-items: center;
  border-radius: ${theme.borderRadius.extraRound};
  padding: 10px;
    height: 300px;
    width: 200px;
    background: ${theme.colors.background_white};
    box-shadow: ${theme.shadows.card};
  transition: all 400ms;
  &:hover{
    transform: scale(1.1);
  }
`

const CardImage = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    height: 100%;
    transition: all 600ms;
  }
  img:hover{
    //transform: scale(1.1);
  }
`

const CardTitle = styled.div`
  background: ${theme.colors.background_white};
  font-family: 'Pacifico', 'sans-serif';
  font-size: ${theme.fonts.size.P3};
`

const CardSubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
    font-family: 'Open Sans', 'sans-serif';
    color: ${theme.colors.primary};
    font-weight: ${theme.fonts.weights.regular};
`

const BottomCard = styled.div`
  background: ${theme.colors.background_white};
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`