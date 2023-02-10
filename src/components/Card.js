import { useEffect, useState } from "react";
import { useDataContext } from "./context/context";
import axios from "axios";
import fullCart from "../img/cart-plus-fill.svg";
import empCart from "../img/cart-plus.svg"



function Card({ product }) {

	const { setProductsInBasket, produktsInBasket, basketId, setBasketId, } = useDataContext();
	const [isAdded, setIsAdded] = useState(false);

	function onClickAddBasket(product) {
		addProductToBasket(product);
	}

	async function addProductToBasket(product) {

		try {
			let data;

			if (basketId) {
				data = await axios.post(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket/${basketId}/products`, product);
			} else {
				const newId = await axios.get(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket`);
				await axios.post(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket`, '');
				data = await axios.post(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket/${newId.data.length + 1}/products`, product);
				setBasketId(newId.data.length + 1);
				localStorage.setItem("e-shop", (newId.data.length + 1).toString())
			}

			setProductsInBasket(prev => [...prev, data.data]);

		} catch (error) {
			alert('failed add to cart')
		}
	}

	function showAdded(arr) {
		if (arr.some(productInBasket => productInBasket.title === product.title)) {
			setIsAdded(true)
		} else { setIsAdded(false); }
	}

	useEffect(() => {
		showAdded(produktsInBasket);
	}, [produktsInBasket])


	return (
		<div className="card">
			<div className="card__img">
				<img width={150} height={150} src={product.image} alt="" />
			</div>
			<h2>{product.title}</h2>
			<div className="card__info">
				<ul>
					<li>
						<span className="card__price-text">Price:</span>
						<span className="card__price-value">{product.price} $</span>
					</li>
					<li>
						<span className="card__rate">rate:</span>
						<span className="card__rate-value">{product.rating.rate}</span>
						<button className="card__buton" onClick={() => onClickAddBasket(product)}>
							<img width={20} height={20} src={isAdded ? fullCart : empCart} alt="" />
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export { Card };
