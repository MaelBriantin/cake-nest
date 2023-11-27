import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {CakeCard} from "../../components/order/CakeCard.jsx";
import styled from "styled-components";
import {fakeMenu2} from "../../store/cakes/cakes.js"
import {AdminPanel} from "../../components/admin/AdminPanel.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";
import {theme} from "../../theme/index.js";
import {PanelButton} from "../../components/admin/PanelButton.jsx";
import {Cart} from "../../components/order/Cart.jsx";

export const OrderPage = () => {
    const {store, resetContext} = useContext(StoreContext)
    const {adminMode} = useContext(AdminContext)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation();

    const state = location.state
    const handleDisconnect = () => {
        navigate('/')
    }
    useEffect(() => {
        !user && navigate('/')
    }, [user, navigate]);
    return user && (
        <UberContainer>
            <Cart />
            <CardContainer>

                {adminMode && store.length === 0 ? (
                    <EmptyStoreStyle>
                        <p>Il n'y a plus de produits disponibles ?</p>
                        <p>Cliquez ci-dessous pour les réinitialiser</p>
                        <PanelButton primary text={'Générer de nouveaux gateaux'} onClick={() => resetContext()} />
                    </EmptyStoreStyle>
                ) : store.length === 0 ? (
                    <EmptyStoreStyle>
                        <p>Victime de notre succès</p>
                        <p>De nouvelles recettes sont en préparation, revenez vite !</p>
                    </EmptyStoreStyle>
                ) : (
                    store.map((e) => (
                        <CakeCard title={e.title} image={e.imageSource} price={e.price} id={e.id} key={e.id} />
                    ))
                )}
            </CardContainer>
        </UberContainer>
    )
}


const UberContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const CardContainer = styled.div`
  width: 75%;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  flex-wrap: wrap;
  overflow: scroll;
  transition: all 400ms;
`

const EmptyStoreStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  p{
    font-family: 'Pacifico', 'sans-serif';
    font-size: ${theme.fonts.size.P4};
    color: ${theme.colors.greyDark};
  }
`