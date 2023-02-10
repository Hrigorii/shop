import React from "react";
import complete from "../img/complete.png";
import empty from "../img/emptycart.png";

function BasketInfo({ isOrderComplete, orderId, isLoading }) {

	return (
		<div className="basket-info">
			{
				isOrderComplete ?
					<>
						<img width={200} height={200} src={complete} alt="orderComlete" />
						<h2>Order Comlete</h2>
						<h3>Your order is {orderId} </h3>
					</>
					:
					isLoading ?
						<h1>Waiting...</h1> :
						<>
							<img width={200} height={200} src={empty} alt="emptycart" />
							<h2>No any products in cart</h2>
						</>
			}
		</div>
	)
}

export { BasketInfo };