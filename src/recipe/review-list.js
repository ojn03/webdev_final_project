import { React, useState } from "react";
import "../styles/global-styles.css";
import "./recipe-styles.css";
import { IoClose } from "react-icons/io5";
import ReviewNoRecipeCard from "../recipe-cards/review-no-recipe";

function RecipeReviewList({ recipeId, closeFunc }) {
	const [currReview, setCurrReview] = useState("");
	const addReview = () => {
		// add a new review using the current user logged in and the value of currReview
        document.getElementById("enter-review-box").value = "";
        setCurrReview("");

	};
	return (
		<div className="fixed wd-review-popup-bg">
			<div className="fixed bg-white wd-review-popup">
				<div
					className="float-right p-4 pt-3 hover:cursor-pointer text-2xl text-stone-600 hover:text-stone-400"
					onClick={() => closeFunc()}>
					<IoClose />
				</div>
				<h2 className="wd-sub-title m-6">Reviews</h2>
				<hr className="w-9/10 mx-8 border-stone-400"></hr>
				<div className="overflow-y-auto wd-review-scroll w-full h-full">

					{/* if chef, show this so they can leave a review */}
					<textarea id="enter-review-box"
						rows={4}
						className="w-full wd-leave-review ring-0 p-2"
						autofocus
						onChange={(e) =>
							setCurrReview(e.targetValue ? e.targetValue : "")
						}></textarea>
					<div  className="float-right wd-btn-bar">
						<button className="wd-btn wd-btn-success" onClick={() => addReview()}>
							Submit
						</button>
					</div>
                    {/* end chef-only area */}

					{/* map through reviews */}
					<ReviewNoRecipeCard />
					<ReviewNoRecipeCard />
                    <ReviewNoRecipeCard />
					<ReviewNoRecipeCard />
				</div>
			</div>
		</div>
	);
}
export default RecipeReviewList;
