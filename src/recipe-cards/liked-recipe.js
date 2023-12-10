import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import {
	FaRegCircleCheck,
	FaCircleCheck,
	FaHeart,
	FaRegHeart,
	FaRegComment,
	FaComment,
} from "react-icons/fa6";

function LikedRecipeCard(recipeId, likedDate) {
	let dummyRecipeTitle = "Creamy Mashed Potatoes With Butter and Herbs";
	let dummyImgUrl =
		"https://www.allrecipes.com/thmb/JMkfc1WFQiiKmTzvz98IXhlOMsg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/24771-basic-mashed-potatoes-mfs321-158e1626bfeb48daadb4f25d737ffee91-912ba4ee2c3c40a1837a5690971cc554.jpg";
	let dummyLikedDate = "1/12/2023";
	let dummyLikes = 14;
	let dummyEndorsements = 3;
	let dummyReviews = 0;

	let link = 1;

	return (
		<Link to={`/recipe/${link}`}>
			<div className="container wd-card my-0 p-0">
				{/* <div className="m-0 p-0 wd-img-container" style={{height:elemHeight}}>
                <img src={dummyImgUrl} alt="test"></img>
            </div> */}

				<div
					id="wd-card-title"
					className="wd-card-title flex align-left flex-auto flex-col p-6 content-end justify-between">
					<div>
						<span className="text-xs italic text-stone-500 wd-liked-on">
							<FaHeart /> <p>You liked on {dummyLikedDate}</p>
						</span>
						<p className="wd-recipe-title py-1">
							{dummyRecipeTitle}
						</p>
					</div>

					<div className="bottom-0 max-h-32 flex align-left flex-auto flex-col bg-stone-200 p-2 px-3 rounded-md justify-center text-stone-600">
						<span className="wd-inline-stats">
							<FaRegHeart /> <p>{dummyLikes} likes</p>
						</span>
						<span className="wd-inline-stats">
							<FaRegCircleCheck />{" "}
							<p>{dummyEndorsements} endorsements</p>
						</span>
						<span className="wd-inline-stats">
							<FaRegComment /> <p>{dummyReviews} reviews</p>
						</span>
					</div>
				</div>
				<div
					className="m-0 p-0 wd-img-container"
					>
					<img  src={dummyImgUrl} alt="test"></img>
				</div>
			</div>
		</Link>
	);
}
export default LikedRecipeCard;
