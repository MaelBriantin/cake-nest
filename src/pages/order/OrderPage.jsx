import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {CakeCard} from "../../components/order/CakeCard.jsx";
import styled from "styled-components";
import {fakeMenu2} from "../../store/cakes/cakes.js"

export const OrderPage = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const state = location.state
    const handleDisconnect = () => {
        navigate('/')
    }
    useEffect(() => {
        !state && navigate('/')
    }, [state, navigate]);

    return state && (
        <Container>
            {fakeMenu2.map((e) => {
                return (<CakeCard title={e.title} image={e.imageSource} price={e.price} key={e.id}/>
                )
            })}
        </Container>
    )
}

const Container = styled.div`
  max-height: 100%;
  width: 80%;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  flex-wrap: wrap;
  overflow: scroll;
`