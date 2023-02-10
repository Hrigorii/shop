import { Link } from "react-router-dom";
import { useDataContext } from "./context/context";
import logo from '../img/logo.png'

export function Header() {

	const { setIsBasketOpened, produktsInBasket, totalCost, searchData, setSearchData } = useDataContext();

	function clickOnBasket() {
		setIsBasketOpened(true);
		document.body.classList.add('lock');
	}

	function onChangeSearch(event) {
		setSearchData(event.target.value)
	}

	return (
		<header className="header">
			<div className="logo">
				<Link to="/">
					<img src={logo} alt="logo" width={100} height={100} />
				</Link>
				<div className="logo__info">
					<h1>E-shop</h1>
					<p>e-shop react</p>
				</div>
			</div>
			<div className="search">
				<input type="text" className="search__input" onChange={onChangeSearch} value={searchData} placeholder="search" />
				{
					searchData &&
					<picture onClick={() => setSearchData('')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</svg>
					</picture>}
			</div>
			<div className="basket" onClick={clickOnBasket}>
				<div className="basket__price" >{totalCost} $</div>
				<div className="basket__number">
					<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
						<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
					</svg></span>
					<span>{produktsInBasket.length > 0 ? produktsInBasket.length : ''}</span>
				</div>
			</div>
		</header>
	)
}

