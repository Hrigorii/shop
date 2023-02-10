import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { InsideBasket } from "./components/InsideBasket";
import { Slider } from "./components/Slider";
import { Orders } from "./components/Orders";
import { Route, Routes } from "react-router";
import { Start } from "./pages/Start";
import { Navigate } from "react-router";
import { Products } from "./components/Products";

export const appDataContext = React.createContext({});

function App() {

  const [products, setProducts] = useState([]);
  const [isBasketOpened, setIsBasketOpened] = useState(false);
  const [produktsInBasket, setProductsInBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [searchData, setSearchData] = useState('');
  const [basketId, setBasketId] = useState(null);

  const dataForContext = {
    products, searchData, totalCost, produktsInBasket,
    setIsBasketOpened, setProductsInBasket, setSearchData,
    setProducts, basketId, setBasketId,
  };

  function countTotalCost(allproducts) {
    setTotalCost(allproducts.reduce((sum, product) => sum + product.price, 0).toFixed(2))
  }

  useEffect(() => {
    countTotalCost(produktsInBasket);
  }, [produktsInBasket])

  useEffect(() => {
    const myCart = localStorage.getItem("e-shop");
    if (myCart) {
      axios.get(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket/${myCart}/products`)
        .then(res => {
          setProductsInBasket(res.data)
          setBasketId(+myCart);
        })
        .catch(error => localStorage.removeItem("e-shop"))
    }
  }, [])


  return (
    <appDataContext.Provider value={dataForContext}>

      <div className="wrapper">

        <InsideBasket isBasketOpened={isBasketOpened} />

        <Header />

        <main className="main">
          <Routes>
            <Route path='/' element={<Navigate to='/products' replace />} />
            <Route path='/' element={<Start />}>
              <Route path='products' element={<Products />} />
              <Route path='category/:name' element={<Products />} />
            </Route>
            <Route path='orders' element={<Orders />} />
          </Routes>
        </main>

        <footer></footer>
      </div>

    </appDataContext.Provider >

  );
}

export default App;
