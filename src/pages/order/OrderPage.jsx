import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {CakeCard} from "../../components/order/CakeCard.jsx";
import styled from "styled-components";
import {AdminPanel} from "../../components/admin/AdminPanel.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";
import {theme} from "../../theme/index.js";
import {PanelButton} from "../../components/admin/PanelButton.jsx";
import {Cart} from "../../components/order/Cart.jsx";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../api/auth.js";
import {getUserMenu} from "../../api/menu.js";

export const OrderPage = () => {
    const {store, resetContext, openedCart, setStore, setMenuId} = useContext(StoreContext)
    const {adminMode} = useContext(AdminContext)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser({name: user.displayName, id: user.uid})
                const menu = await getUserMenu(user.uid)
                setStore(menu.data.menu)
                setMenuId(menu.id)
                //setStore(getUserMenu(user.uid))
                //console.log(store)
            }
        })
    }, []);

    return user && (
        <UberContainer>
            <Cart />
            {
                store.length !== 0 && (
                    <CardContainer $openedCart={openedCart}>
                        { store.length > 0 && (
                            store.map((e) => (
                                <CakeCard title={e.title} image={e.imageSource} price={e.price} id={e.id} key={e.id} />
                            ))
                        )}
                    </CardContainer>
                )
            }
            { (adminMode && store.length === 0) && (
                <EmptyStoreStyle $openedCart={openedCart}>
                    {
                        (adminMode && store.length === 0) && (
                            <>
                                <p>Il n'y a plus de produits disponibles ?</p>
                                <p>Cliquez ci-dessous pour les réinitialiser</p>
                                <PanelButton primary text={'Générer de nouveaux gateaux'} onClick={(e) => resetContext(e)} />
                            </>
                        )
                    }
                    {
                        (!adminMode && store.length === 0) && (
                            <>
                                <p>Victime de notre succès</p>
                                <p>De nouvelles recettes sont en préparation, revenez vite !</p>
                            </>
                        )
                    }
                </EmptyStoreStyle>
            )}
            <AdminPanel />
        </UberContainer>

    )
}


const UberContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const CardContainer = styled.div`
  width: ${props => props.$openedCart ? '100%' : '80%'};
  padding: 50px;
  margin-left: ${props => props.$openedCart ? '0%' : '20%'};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
  transition: all 400ms;
`;

const EmptyStoreStyle = styled.div`
  min-height: 100%;
  width: 100%;
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