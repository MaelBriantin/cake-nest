import {LoginPage} from "./pages/login/LoginPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OrderPage} from "./pages/order/OrderPage.jsx";
import {ErrorPage} from "./pages/error/ErrorPage.jsx";
import "./App.css"
import {Layout} from "./components/layouts/Layout.jsx";
import {AdminPanel} from "./components/admin/AdminPanel.jsx";
import {AdminContext, AdminProvider} from "./context/AdminContext.jsx";
import {StoreProvider} from "./context/StoreContext.jsx";
import {UserProvider} from "./context/UserContext.jsx";

function App() {

    return (
            <AdminProvider>
                <UserProvider>
                    <StoreProvider>
                        <BrowserRouter>
                            <Routes>
                                {/*<LoginPage />*/}
                                <Route path='/' element={<LoginPage/>}/>
                                <Route element={<Layout/>}>
                                    <Route path={'order'} element={<OrderPage/>} />
                                </Route>
                                <Route path='*' element={<ErrorPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </StoreProvider>
                </UserProvider>
            </AdminProvider>
    )
}

export default App