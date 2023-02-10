import { Nav } from "../components/Nav";
import { useDataContext } from "../components/context/context";
import { Outlet } from "react-router";

export function Start() {
	const { products } = useDataContext();

	return (
		<>
			{/* <Slider /> */}
			<Nav
				products={products}
			/>
			<div className="main__content">
				<h1>Products</h1>
				<Outlet />
			</div>
		</>
	)
}