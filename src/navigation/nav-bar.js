import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global-styles.css";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import './nav.css';

function NavBar() {
	const links = ["home", "search", "profile"];
	const icons = [<MdHomeFilled />, <FiSearch />, <FaUserCircle />];
	const { pathname } = useLocation();

	return (
		<div className="flex min-[600px]:flex-col max-[600px]:flex-row p-2 justify-start items-center wd-nav-bar">
			{links.map((link, index) => (
				<Link
					key={index}
					to={`/${link}`}
					className={`wd-nav-icon min-[600px]:text-3xl max-[600px]:text-2xl m-2 text-stone-600 ${pathname.includes(link) && "active"}`}>
					{icons[index]}
				</Link>
			))}
		</div>
	);
}
export default NavBar;
