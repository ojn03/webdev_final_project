import { React} from "react";
import "../styles/global-styles.css";
import LikedRecipeCard from "../recipe-cards/liked-recipe";

function Home() {

    let dummyRecipeTitle = "Creamy Mashed Potatoes";
    let dummyImgUrl = "https://www.allrecipes.com/thmb/JMkfc1WFQiiKmTzvz98IXhlOMsg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/24771-basic-mashed-potatoes-mfs321-158e1626bfeb48daadb4f25d737ffee91-912ba4ee2c3c40a1837a5690971cc554.jpg";

    
  return (
    <div className="w-full mx-auto">
        {/* <h1 className="text-black">Home</h1> */}
       <LikedRecipeCard />
    </div>
  );
}
export default Home;