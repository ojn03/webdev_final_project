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
import RecipeReviewList from "./review-list";

function Recipe() {
	let dummyRecipeTitle = "Creamy Mashed Potatoes With Butter and Herbs";
	let dummyImgUrl =
		"https://www.allrecipes.com/thmb/JMkfc1WFQiiKmTzvz98IXhlOMsg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/24771-basic-mashed-potatoes-mfs321-158e1626bfeb48daadb4f25d737ffee91-912ba4ee2c3c40a1837a5690971cc554.jpg";
	let dummyLikedDate = "1/12/2023";
	let dummyLikes = 14;
	let dummyEndorsements = 3;
	let dummyReviews = 0;
	let dummySource = "http://www.foodnetwork.com";
    let dummyIngredients = ["3 russet potatoes", "4 tablespoons butter, unsalted", "1/2 cup heavy cream", "2 tablespoons green onions, thinly sliced on a bias", "salt and pepper, to taste"]
	const [liked, setLiked] = useState(false); // would use a check to database instead of just setting false
	const [endorsed, setEndorsed] = useState(false); // would use a check to database instead of just setting false
    const [seeReviews, setSeeReviews] = useState(false);

	const handleLiked = () => {
		setLiked(!liked);
		// now actually set it as liked or unliked in db
        // and update number of likes
	};

	const handleEndorsed = () => {
		setEndorsed(!endorsed);
		// now actually set it as endorsed or unendorsed in db
        // and update number of endorsements
	};

	const openReviews = () => {
        setSeeReviews(true);
		// open reviews popup
	};

    const closeReviews = () => {
        setSeeReviews(false);
		// close reviews popup
	};


	return (
		<div className="w-full p-0 m-0">
            <div>{seeReviews && <RecipeReviewList recipeId="someID" closeFunc={closeReviews}/>}</div>
			<img
				className="wd-recipe-header"
				alt="mashed potatoes"
				src={dummyImgUrl}></img>
			<div className="m-8">
				<h1 className="wd-recipe-title">{dummyRecipeTitle}</h1>
				<a
					target="_blank"
					rel="noreferrer"
					className="underline text-lg text-stone-500 hover:text-stone-400"
					href={dummySource}>
					{dummySource}
				</a>
				<div className="mt-6 bottom-0 max-h-32 flex align-left flex-auto flex-col bg-stone-200 p-2 px-3 rounded-md justify-center text-stone-600">
					{/* if regular person, show this: */}
					<span className="wd-inline-stats">
						<div
							className="wd-inline-stats hover:text-stone-400 hover:cursor-pointer"
							onClick={() => handleLiked()}>
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
						onClick={() => openReviews()}>
						<div className="wd-inline-stats">
							<FaRegComment />
						</div>{" "}
						<p>{dummyReviews} reviews</p>
					</span>
				</div>

                <div className="my-3 mt-6">
                    <h2 className="wd-sub-title text-stone-500">Ingredients</h2>
                    <ul className="list-disc ml-5 mt-3">
                    {dummyIngredients.map((ingr) => (<li className="pl-1 mb-2">{ingr}</li>))}
                    </ul>
                </div>
			</div>
		</div>
	);
}
export default Recipe;
