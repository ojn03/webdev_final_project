import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import {
	FaRegHeart,
	FaRegComment,
} from "react-icons/fa6";
import * as client from "../client.js";
import { fetchRecipeById } from "../search/recipe-service";

function RecipeCard({ recipeId }) {


	const [recipe, setRecipe] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [likes, setLikes] = useState(null);

	const fetchAll = async () => {

		const tempRecipe = await fetchRecipeById(recipeId);
		setRecipe(tempRecipe);
		const tempReviews = await client.findCommentsByRecipeId(tempRecipe.id);
		setReviews(tempReviews);
		const tempLikes = await client.findLikesByRecipeId(tempRecipe.id);
		setLikes(tempLikes);
	}

	// const fetchLikes = async () => {
	// 	const likes = await client.findLikesByRecipeId(recipe.id);
	// 	setLikes(likes);
	// };

	// const fetchReviews = async () => {
	// 	const reviews = await client.findCommentsByRecipeId(recipe.id);
	// 	setReviews(reviews);
	// };

	useEffect(() => {
		fetchAll();
	}, []);

	return (<>
		{recipe && reviews && likes && <Link to={`/recipe/${recipe.id}`}>
			<div className="container wd-card my-0 p-0">
				<div
					id="wd-card-title"
					className="wd-card-title flex align-left flex-auto flex-col p-6 content-end justify-between">
					<div>
						<p className="wd-recipe-title py-1">
							{recipe.label}
						</p>
					</div>

					<div className="bottom-0 max-h-32 flex align-left flex-auto flex-col bg-stone-200 p-2 px-3 rounded-md justify-center text-stone-600">
						<span className="wd-inline-stats">
							<FaRegHeart /> <p>{likes ? likes.length : 0} likes</p>
						</span>

						<span className="wd-inline-stats">
							<FaRegComment /> <p>{reviews ? reviews.length : 0} reviews</p>
						</span>
					</div>
				</div>
				<div
					className="m-0 p-0 wd-img-container"
				>
					<img src={recipe.image} alt={recipe.label}></img>
				</div>
			</div>
		</Link>} </>
	);
}
export default RecipeCard;
