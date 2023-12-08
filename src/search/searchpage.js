import React, { useEffect, useState } from "react";
import "../styles/global-styles.css";
import { fetchRecipe } from "./recipe-service";

function Search() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFetchRecipe = async () => {
    try {
      const result = await fetchRecipe(searchTerm); // Assuming you have a fetchRecipe function
      console.log(result)
      setData(result || []);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type here..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchRecipe}>Fetch Recipe</button>
      {data.hits && data.hits.map((hit, index) => (
        <div key={index}>
          <img
            src={hit.recipe.image}
            alt={hit.recipe.label}
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
          {JSON.stringify(hit.recipe.label)}
        </div>
      ))}    </div>
  );
}

export default Search;
