import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
import RecipeReviewCard from "../recipe-cards/recipe-review";
import * as client from "../client.js";

function Home() {
	const [account, setAccount] = useState(null);
	const [likedRecipes, setLikedRecipes] = useState(null);

	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
		}
		catch (error) {
			console.log(error);
		}
	};

	const fetchLikedRecipes = async () => {
		try {
			let likedRecipes = await client.findLikesByAuthorId(account._id);
			likedRecipes.sort((a, b) => b.createdAt - a.createdAt);
			likedRecipes = likedRecipes.map(like => like.recipeId)
			setLikedRecipes(likedRecipes);
		}
		catch (error) {
			console.log(error);
		}
	};

	const fetchReviews = async () => {
		const reviews = []
		for ( let id of account.following ){
			const moreReviews = await client.findCommentsByAuthorId(id);
			reviews.concat(moreReviews);
		}
		reviews.sort((a, b) => b.createdAt - a.createdAt);

	}


	useEffect(() => {
		fetchAccount();
		// fetchLikedRecipes();
	}, []);



	return (
		<div className="w-full mx-auto !mb-6">
			<h1 className="text-black">Home</h1>
			{/* {account && <>
				{likedRecipes.map}
				<LikedRecipeCard recipeId="" />
				<RecipeReviewCard reviewId="" />
			</>} */}
			{/* TODO: get list of liked recipes andn reviews from followed chefs, order them from newst to oldest, then display them as either LikedRecipeCards or RecipeReviewCards */}
		</div>
	);
}
export default Home;
