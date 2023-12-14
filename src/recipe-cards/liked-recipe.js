import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import {
	FaHeart,
	FaRegHeart,
	FaRegComment,
} from "react-icons/fa6";
import * as client from "../client.js";
import { fetchRecipeById } from "../search/recipe-service";
import { getRecipeIdFromUri } from "../search/recipe_preview.js";

function LikedRecipeCard({ likeId }) {

	const [like, setLike] = useState(null);
	const [recipe, setRecipe] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [likes, setLikes] = useState(null);

	const fetchAll = async () => {
		const tempLike = await client.findLikeById(likeId);
		setLike(tempLike);
		const tempRecipe = await fetchRecipeById(tempLike.recipeId);
		setRecipe(tempRecipe);
		const recipeId = getRecipeIdFromUri(tempRecipe.uri)
		const tempReviews = await client.findCommentsByRecipeId(recipeId);
		setReviews(tempReviews);
		const tempLikes = await client.findLikesByRecipeId(recipeId);
		setLikes(tempLikes);
	}

	const fetchLike = async () => {
		const like = await client.findLikeById(likeId);
		setLike(like);
	};

	const fetchLikes = async () => {
		const likes = await client.findLikesByRecipeId(recipe.id);
		setLikes(likes);
	};

	const fetchReviews = async () => {
		const reviews = await client.findCommentsByRecipeId(recipe.id);
		setReviews(reviews);
	};

	useEffect(() => {
		fetchAll();
	}, []);

	return (<>
		{like && recipe && reviews && likes && <Link to={`/recipe/${like.recipeId}`}>
			<div className="container wd-card my-0 p-0">
				<div
					id="wd-card-title"
					className="wd-card-title flex align-left flex-auto flex-col p-6 content-end justify-between">
					<div>
						<span className="text-xs italic text-stone-500 wd-liked-on">
							<FaHeart /> <p>You liked on {like.created}</p>
						</span>
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
export default LikedRecipeCard;
