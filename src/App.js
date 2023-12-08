import { Routes, Route, Navigate } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import "./styles/global-styles.css";
import Home from "./home/homepage";
import Search from "./search/searchpage";
import Profile from "./account/profile";
import Login from "./account/login";
import Signup from "./account/signup";
import EditProfile from "./account/edit-profile";
import Recipe from "./recipe/recipe";
import NavBar from "./navigation/nav-bar";

function App() {
	return (
		<HashRouter>
			<div className="container flex wrap">
        <NavBar />
        <div className="flex p-8">
				<Routes>
					<Route path="/" element={<Navigate to="home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/profile/edit" element={<EditProfile />} />
					<Route path="/recipe/:id" element={<Recipe />} />
				</Routes>
        </div>
			</div>
		</HashRouter>
	);
}

export default App;
