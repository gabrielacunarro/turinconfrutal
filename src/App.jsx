import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import { ItemListContainer } from "./components/ItemListContainer.jsx";
import { Cart } from "./components/Cart.jsx";
import Footer from "./components/Footer.jsx";
import { Provider } from "./contexts/ItemsContext.jsx";

function App() {
    return (
        <BrowserRouter>
            <Provider>
                <NavBar />
                <Routes>
                    <Route path="/" element={<ItemListContainer />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </Provider>
        </BrowserRouter>
    );
}

export default App;
