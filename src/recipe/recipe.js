import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import "./recipe-styles.css";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { useParams } from "react-router";
import RecipeReviewList from "./review-list";
import { fetchRecipeById } from "../search/recipe-service";
import SigninPromptPopup from "../account/signin-prompts/signin-popup";
import * as client from "../client.js";

function Recipe() {
	const [account, setAccount] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [likes, setLikes] = useState(null);
	const { id: recipeId } = useParams();
	const [liked, setLiked] = useState(false); // would use a check to database instead of just setting false
	const [seeReviews, setSeeReviews] = useState(false);
	const [recipe, setRecipe] = useState(undefined);
	const [signinPopup, setSigninPopup] = useState(false);

	useEffect(() => {
		fetchAccount();
	}, []);

	useEffect(() => {
		fetchLikes();
		fetchReviews();
	}, [account]);

	const openReviews = () => {
		let signedin = account !== null;
		if (!signedin) {
			setSigninPopup(true);
		} else {
			setSeeReviews(true);
		}
	};

	const closeReviews = () => {
		setSeeReviews(false);
		// close reviews popup
	};

	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchLikes = async () => {
		try {
			const likes = await client.findLikesByRecipeId(recipeId);
			setLikes(likes);

			try {
				const liked = likes.some((like) => like.authorId === account?._id);
				setLiked(liked);
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			if (error.status !== 404) {
				console.log(error);
			}
		}
	};

	// const fetchLiked = async () => {
	// 	try {
	// 		const liked = likes.some((like) => like.authorId === account?._id);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const fetchReviews = async () => {
		try {
			const comments = await client.findCommentsByRecipeId(recipeId);
			setReviews(comments);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLiked = async () => {
		// if not signed in:
		if (!account) {
			setSigninPopup(true);
		} else {
			const like = { authorId: account._id, recipeId };

			if (liked) {
				await client.deleteLike(like);
			} else {
				await client.createLike(like);
			}
			setLiked(!liked);
			const likes = await client.findLikesByRecipeId(recipeId);
			setLikes(likes);
		}
	};

	useEffect(() => {
		fetchRecipeById(recipeId).then((recipe) => {
			setRecipe(recipe);
		});
	}, [recipeId]);

	if (recipe === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full p-0 m-0">
			<div>
				{seeReviews && (
					<RecipeReviewList recipeId={recipeId} closeFunc={closeReviews} />
				)}
			</div>
			<div>{signinPopup && <SigninPromptPopup onClose={setSigninPopup} />}</div>
			<img
				className="wd-recipe-header"
				alt={recipe.label}
				src={recipe.image}
			></img>
			<div className="m-8">
				<h1 className="wd-title">{recipe.label}</h1>

				<div className="mt-6 bottom-0 max-h-32 flex align-left flex-auto flex-col bg-stone-200 p-2 px-3 rounded-md justify-center text-stone-600">
					<span className="wd-inline-stats">
						<div
							className="wd-inline-stats hover:text-stone-400 hover:cursor-pointer"
							onClick={() => account && handleLiked()}
						>
							{liked ? <FaHeart /> : <FaRegHeart />}
						</div>
						<p>{likes ? likes.length : "0"} likes</p>
					</span>

					<span
						className="wd-inline-stats hover:text-stone-400 hover:cursor-pointer"
						onClick={() => openReviews()}
					>
						<div className="wd-inline-stats">
							<FaRegComment />
						</div>
						<p>{reviews ? reviews.length : "0"} reviews</p>
					</span>
				</div>

				<div className="my-3 mt-6">
					<h2 className="wd-sub-title text-stone-500">Ingredients</h2>
					<ul className="list-disc ml-5 mt-3">
						{recipe.ingredientLines.map((ingr, index) => (
							<li className="pl-1 mb-2" key={index + 1}>
								{ingr}
							</li>
						))}
					</ul>
				</div>
				{recipe.instructionLines.length !== 0 ? (
					<div className="my-3 mt-6">
						<h2 className="wd-sub-title text-stone-500">Instructions</h2>
						<ul className="list-disc ml-5 mt-3 !pb-6">
							{recipe.instructionLines.map((step, index) => (
								<li className="pl-1 mb-2" key={index + 1}>
									{step}
								</li>
							))}
						</ul>
					</div>
				) : undefined}
			</div>
		</div>
	);
}
export default Recipe;
