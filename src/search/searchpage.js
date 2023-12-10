import React, { useState } from "react";
import "../styles/global-styles.css";
import { fetchRecipe } from "./recipe-service";
import { Button, Card } from 'react-bootstrap';
import RecipePreview from "./recipe_preview";
import "./search-styles.css";

function Search() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFetchRecipe = async () => {
    try {
      const result = await fetchRecipe(searchTerm); // Assuming you have a fetchRecipe function
      console.log(result)
      setData(result || []);
      setPrevSearchTerm(searchTerm);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setPrevSearchTerm(searchTerm);
    }
  }

  return (
    <div className="m-6 w-full">
      <input
        type="text"
        placeholder="Type here..."
        value={searchTerm}
        onChange={handleInputChange}
        className="form-control mb-3 wd-input"
      />
      <Button onClick={handleFetchRecipe} variant="primary" className="mb-3 wd-btn">
        Fetch Recipe
      </Button>
      <div className="row flex flex-row flex-wrap wd-search-results">
        {data.hits &&
          data.hits.map((hit, index) => (
            <RecipePreview apiResult={hit} key={index}/>
          ))}
          {data.hits && data.hits.length === 0 && <div className="text-stone-600">No results matching "{prevSearchTerm}"</div>}

      </div>
    </div>
  )
}

export default Search;
