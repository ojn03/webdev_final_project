import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
import RecipeReviewCard from "../recipe-cards/recipe-review";
import * as client from "../client.js";

function Home() {
	const [account, setAccount] = useState(null);

	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
		}
		catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAccount();
	}, []);

	return (
		<div className="w-full mx-auto !mb-6">
			<h1 className="text-black">Home</h1>
			{account && <>
				<LikedRecipeCard recipeId="" />
				<RecipeReviewCard reviewId="" />
			</>}
			{/* TODO: get list of liked recipes andn reviews from followed chefs, order them from newst to oldest, then display them as either LikedRecipeCards or RecipeReviewCards */}
		</div>
	);
}
export default Home;
