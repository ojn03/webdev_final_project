import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import "./recipe-styles.css";
import {
	FaRegCircleCheck,
	FaCircleCheck,
	FaHeart,
	FaRegHeart,
	FaRegComment,
	FaComment,
} from "react-icons/fa6";
import { useParams } from "react-router";
import RecipeReviewList from "./review-list";
import { fetchRecipeById } from "../search/recipe-service";
import SigninPromptPopup from "../account/signin-prompts/signin-popup";

function Recipe() {

	let dummyRecipeTitle = "Creamy Mashed Potatoes With Butter and Herbs";

	let dummyLikes = 14;
	let dummyEndorsements = 3;
	let dummyReviews = 0;

	const { id: recipeId } = useParams();
	const [liked, setLiked] = useState(false); // would use a check to database instead of just setting false
	const [endorsed, setEndorsed] = useState(false); // would use a check to database instead of just setting false
	const [seeReviews, setSeeReviews] = useState(false);
	const [recipe, setRecipe] = useState(undefined);
	const [signinPopup, setSigninPopup] = useState(false);


	useEffect(() => {
		fetchRecipeById(recipeId).then((recipe) => {
			setRecipe(recipe);
		});

	}, [recipeId]);

	const handleLiked = () => {
		// if not signed in:
		let signedin = false;
		if (!signedin) {
			setSigninPopup(true);
		}
		else {
			setLiked(!liked);
		}

		// now actually set it as liked or unliked in db
		// and update number of likes
	};

	const handleEndorsed = () => {
		setEndorsed(!endorsed);
		// now actually set it as endorsed or unendorsed in db
		// and update number of endorsements
	};

	const openReviews = () => {
		let signedin = false;
		if (!signedin) {
			setSigninPopup(true);
		}
		else {
			setSeeReviews(true);
		}
		// setSeeReviews(true);
		// open reviews popup
	};

	const closeReviews = () => {
		setSeeReviews(false);
		// close reviews popup
	};

	if (recipe === undefined) {
		return <div>Loading...</div>;
	}


	return (
		<div className="w-full p-0 m-0">
			<div>{seeReviews && <RecipeReviewList recipeId="someID" closeFunc={closeReviews} />}</div>
			<div>{signinPopup && (
				<SigninPromptPopup
					userId={"fake id"}
					onClose={setSigninPopup}
				/>
			)}</div>
			<img
				className="wd-recipe-header"
				alt={recipe.label}
				src={recipe.image}
			></img>
			<div className="m-8">

				<h1 className="wd-title">{recipe.label}</h1>
				{/* <a
					target="_blank"
					rel="noreferrer"
					className="underline text-lg text-stone-500 hover:text-stone-400"
					href={dummySource}>
					{dummySource}
				</a> */}

				<div className="mt-6 bottom-0 max-h-32 flex align-left flex-auto flex-col bg-stone-200 p-2 px-3 rounded-md justify-center text-stone-600">
					{/* if regular person, show this: */}
					<span className="wd-inline-stats">
						<div
							className="wd-inline-stats hover:text-stone-400 hover:cursor-pointer"
							onClick={() => handleLiked()}
						>
							{liked ? <FaHeart /> : <FaRegHeart />}
						</div>{" "}
						<p>{dummyLikes} likes</p>
					</span>
					<span className="wd-inline-stats">
						{endorsed ? <FaCircleCheck /> : <FaRegCircleCheck />}{" "}
						<p>{dummyEndorsements} endorsements</p>
					</span>
					{/* if chef, show this: */}

					{/* <span className="wd-inline-stats">

						<div className="wd-inline-stats">
							<FaRegHeart />
						</div>{" "}
						<p>{dummyLikes} likes</p>
					</span>
					<span className="wd-inline-stats">
						<div
							className="wd-inline-stats hover:text-stone-400 hover:cursor-pointer"
							onClick={() => handleLiked()}>
							{endorsed ? (
								<FaCircleCheck />
							) : (
								<FaRegCircleCheck />
							)}
						</div>{" "}
						<p>{dummyEndorsements} endorsements</p>
					</span> */}


					{/* for both users and chefs: */}
					<span
						className="wd-inline-stats hover:text-stone-400 hover:cursor-pointer"
						onClick={() => openReviews()}
					>
						<div className="wd-inline-stats">
							<FaRegComment />
						</div>{" "}
						<p>{dummyReviews} reviews</p>
					</span>
				</div>

				<div className="my-3 mt-6">
					<h2 className="wd-sub-title text-stone-500">Ingredients</h2>
					<ul className="list-disc ml-5 mt-3">
						{recipe.ingredientLines.map((ingr) => (
							<li className="pl-1 mb-2">{ingr}</li>
						))}
					</ul>
				</div>
				{recipe.instructionLines.length !== 0 ? <div className="my-3 mt-6">
					<h2 className="wd-sub-title text-stone-500">Instructions</h2>
					<ul className="list-disc ml-5 mt-3 !pb-6">
						{recipe.instructionLines.map((step, index) => (
							<li className="pl-1 mb-2" key={index + 1}>{step}</li>
						))}
					</ul>
				</div> : undefined}

			</div>
		</div>
	);

}
export default Recipe;
