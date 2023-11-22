import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Button} from "../global/Button.jsx";
import {formatPrice} from "../../utils/maths.js"
import cake from "../../../public/images/cupcake-item.png"

export const CakeCard = (props) => {
    console.log(props)
    const {image, title, price} = props
    return (
        <Card>
            <CardImage src={image} alt={''}/>
            <BottomCard>
                <CardTitle>{title}</CardTitle>
                <CardSubTitle>
                    <p>{formatPrice(price)}</p>
                    <Button style={'primary'} size={'small'} value={'Ajouter'}></Button>
                </CardSubTitle>
            </BottomCard>
        </Card>
    )
}

const Card = styled.div`
  align-items: center;
  border-radius: ${theme.borderRadius.extraRound};
  padding: 10px;
    height: 300px;
    width: 200px;
    background: ${theme.colors.background_white};
    box-shadow: ${theme.shadows.card};
`

const CardImage = styled.img`
  height: 50%;
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