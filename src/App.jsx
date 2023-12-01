import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OrderPage} from "./pages/order/OrderPage.jsx";
import {ErrorPage} from "./pages/error/ErrorPage.jsx";
import "./App.css"
import {Layout} from "./components/layouts/Layout.jsx";
import {ContextProviders} from "./context/ContextProviders.jsx";
import {LoginLayout} from "./components/layouts/LoginLayout.jsx";
import {LoginPage} from "./pages/login/LoginPage.jsx";
import {SignUpPage} from "./pages/login/SignUpPage.jsx";
import {auth} from "./api/auth.js";
import {useAutoUpdate} from "./hooks/store/useAutoUpdate.js";

function App() {
    return (
            <BrowserRouter>
                <ContextProviders>
                    <Routes>
                        <Route element={<LoginLayout />}>
                            <Route path={'/'} element={<LoginPage />}/>
                            <Route path={'/signUp'} element={<SignUpPage />}/>
                        </Route>
                        {/*<Route path='/' element={<LoginPage/>}/>*/}
                        {/*<Route path='/signin' element={<SignUpPage/>}/>*/}
                        <Route element={<Layout/>}>
                            <Route path={'order'} element={<OrderPage/>} />
                        </Route>
                        <Route path='*' element={<ErrorPage/>}/>
                    </Routes>
                </ContextProviders>
            </BrowserRouter>
    )
}

export default App