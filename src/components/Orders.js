import axios from "axios";
import { useEffect, useState } from "react"

export function Orders() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`https://63df803ea76cfd41058375a1.mockapi.io/api/v1/orders`);
				console.log(data);
				setOrders(data)
			} catch (error) {
				alert('something wrong')
			}
		})();
	}, [])

	return (
		<div className="orders">
			<h1>My Orders</h1>
			<div className="orders__content">
				{
					orders.map(order => (
						<div key={order.id} className="orders__order">
							< h2 > Order# {order.id} </h2>
							{
								order.products.map(product => (
									< div key={product.id} className="mini-card">
										<div className="mini-card__img">
											<img width={70} height={70} src={product.image} alt="" />
										</div>
										<div className="mini-card__info">
											<h3>{product.title}</h3>
											<span className="mini-card__price">Price: {product.price}$</span>
											<span className="mini-card__rate">rate: {product.rating.rate}</span>
										</div>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		</div >
	)
}
