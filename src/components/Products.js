import { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MyLoader } from "./Myloader";
import { useDataContext } from "./context/context";


function Products() {

	const { name } = useParams();
	const [isLoading, setIsloading] = useState(false);
	const { products, setProducts, searchData } = useDataContext();

	const url = !name ? `https://fakestoreapi.com/products` : `https://fakestoreapi.com/products/category/${name}`;

	function getProducts(url) {
		try {
			setIsloading(true);
			axios.get(url).then(res => setProducts(res.data));
		} catch (error) {
			alert('failed to get data')
		}
		setIsloading(false);
	}

	useEffect(() => {
		getProducts(url)
	}, [name])

	return (
		<div className="products">
			{
				isLoading ? <MyLoader /> :

					products.filter(prod => prod.title.toLowerCase().includes(searchData.toLowerCase())).map((product) => (
						<Card key={product.id}
							product={product}
						/>
					))}
		</div>
	)
}

export { Products };