import {LoginPage} from "./pages/login/LoginPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OrderPage} from "./pages/order/OrderPage.jsx";
import {ErrorPage} from "./pages/error/ErrorPage.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/*<LoginPage />*/}
                <Route path='/' element={<LoginPage/>}/>
                <Route path='order' element={<OrderPage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App