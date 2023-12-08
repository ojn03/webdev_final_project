import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global-styles.css";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import './nav.css';

function NavBarSide() {
	const links = ["home", "search", "profile"];
	const icons = [<MdHomeFilled />, <FiSearch />, <FaUserCircle />];
	const { pathname } = useLocation();

	return (
		<div className="flex flex-col p-2 justify-start items-center wd-nav-bar">
			{links.map((link, index) => (
				<Link
					key={index}
					to={`/${link}`}
					className={`wd-nav-icon text-3xl m-2 ${pathname.includes(link) && "active"}`}>
					{icons[index]}
				</Link>
			))}
		</div>
	);
}
export default NavBarSide;
