import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDataContext } from "./context/context";


export function Nav() {

	const { products, setProducts } = useDataContext();
	const [categories, setCategories] = useState([]);
	const [selectedSort, setSelectedSort] = useState('title');
	const [isUp, setIsUp] = useState(true);

	function getAllcategories() {
		axios.get('https://fakestoreapi.com/products/categories')
			.then(response => setCategories([...response.data]))
	}

	useEffect(() => {
		getAllcategories()
	}, [])

	function sortBy(sort, direction) {
		setSelectedSort(sort);
		setIsUp(direction);
		const sortDirection = direction ? 1 : -1;

		switch (sort) {
			case 'title':
				setProducts([...products].sort((a, b) => direction ? a[sort].localeCompare(b[sort]) : -a[sort].localeCompare(b[sort])));
				break;
			case 'price':
				setProducts([...products].sort((a, b) => a[sort] > b[sort] ? sortDirection : -sortDirection));
				break;
			case 'rate':
				setProducts([...products].sort((a, b) => a.rating[sort] > b.rating[sort] ? sortDirection : -sortDirection));
				break;
			default:
				break;
		}
	}


	return (
		<nav className="nav">
			<div className="nav__menu">
				<ul className="nav__lists">
					<NavLink to={`/products`}>
						<li className="nav__list">ALL</li>
					</NavLink>
					{
						categories ?
							categories.map(cat => (
								<NavLink key={cat} to={`category/${cat}`}>
									<li className="nav__list">{cat.toUpperCase()}</li>
								</NavLink>
							))
							:
							<li className="nav__list">No any categories</li>
					}
				</ul>
			</div>
			<div className="nav__sort">
				<input id="updown" className="nav__chk" onChange={(event) => sortBy(selectedSort, event.target.checked)} type="checkbox" defaultChecked />
				<label htmlFor="updown" className="nav__sort-label">Sort by:</label>
				<select name="nav__sort-type" id="sort" value={selectedSort} onChange={(event) => sortBy(event.target.value, isUp)}>
					<option value="title">Title</option>
					<option value="price">Price</option>
					<option value="rate">Rate</option>
				</select>
			</div>
		</nav>
	)
}


