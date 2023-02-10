import { useEffect, useState } from "react";
import axios from "axios";
import { useDataContext } from "./context/context";
import { BasketInfo } from "./BasketInfo";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));


export function InsideBasket({ isBasketOpened }) {

	const [isEnabled, setIsEnabled] = useState(true);
	const [isOrderComplete, setIsOrderComlete] = useState(false);
	const { totalCost, produktsInBasket, setIsBasketOpened, setProductsInBasket, basketId } = useDataContext();
	const [orderId, setOrderId] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	function enabDisabButtonPay() {
		produktsInBasket.length > 0 ? setIsEnabled(true) : setIsEnabled(false);
	}

	useEffect(() => {
		enabDisabButtonPay();
	}, [produktsInBasket])

	function closeBasket() {
		setIsBasketOpened(false);
		document.body.classList.remove('lock');
		if (isOrderComplete) setIsOrderComlete(false);
	}


	function deleteProductFromBasket(id) {
		try {
			setProductsInBasket(prev => prev.filter(product => product.id !== id));
			axios.delete(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket/${basketId}/products/${id}`);
		} catch (error) {
			alert("can't delete from cart")
		}
	}

	async function makeOrder() {
		try {
			setIsEnabled(false);
			setIsLoading(true);
			for (let i = 0; i < produktsInBasket.length; i++) {
				await axios.delete(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket/${basketId}/products/${produktsInBasket[i].id}`);
				await delay();
			}
			const { data } = await axios.delete(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/basket/${basketId}`);
			setOrderId(data.id)
			setIsOrderComlete(true);
			setProductsInBasket([]);
			localStorage.removeItem("e-shop");
		} catch (error) {
			alert('order is not complete');
		}
		setIsLoading(false);
	}


	return (
		<div className={`cover ${isBasketOpened ? 'visible' : ''}`}>
			<div className={`inside-basket ${isBasketOpened ? 'visible' : ''}`}>
				<h3>Your Cart</h3>
				<button className="close__buton" onClick={closeBasket}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
					</svg>
				</button>
				<div className={`inside-basket__products `}>

					{
						!isEnabled ? <BasketInfo isOrderComplete={isOrderComplete} orderId={orderId} isLoading={isLoading} /> :
							produktsInBasket.map((product, index) => (
								<div key={index} className="inside-basket__card">
									<div className="inside-basket__img">
										<img width={70} height={70} src={product.image} alt="" />
									</div>
									<div className="inside-basket__info">
										<h3>{product.title}</h3>
										<span className="inside-basket__price">Price: {product.price}$</span>
										<span className="inside-basket__rate">rate: {product.rating.rate}</span>
									</div>
									<button className="card__button" onClick={() => deleteProductFromBasket(product.id)}>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
											<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
										</svg>
									</button>
								</div>
							))
					}
				</div>
				<div className="buy">
					<div className="buy__text">Total</div>
					<div className="buy__sum">{totalCost}$</div>
					<button className={`buy__button `} disabled={!isEnabled} onClick={makeOrder}>Buy</button>
				</div>
			</div>
		</div >
	)
}

