import {LoginPage} from "./pages/login/LoginPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OrderPage} from "./pages/order/OrderPage.jsx";
import {ErrorPage} from "./pages/error/ErrorPage.jsx";
import "./App.css"
import {Layout} from "./components/layouts/Layout.jsx";
import {ContextProviders} from "./context/ContextProviders.jsx";

function App() {
    return (
            <BrowserRouter>
                <ContextProviders>
                    <Routes>
                        <Route path='/' element={<LoginPage/>}/>
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