import { getCategories, getAreas, renderWithTemplate, getRecipesByAreaAndCategory } from './utils.mjs';

// populate the selectors
async function selectorOptionsTemplate() {
    const category = document.getElementById("category");
    const area = document.getElementById("area");

    let categoryOptions = `<option value="" disabled selected hidden>Select One</option>`;
    let areaOptions = `<option value="" disabled selected hidden>Select One</option>`;

    try {
        const categories = await getCategories();
        const areas = await getAreas();

        for (let i = 0; i < categories.meals.length; i++) {
            categoryOptions += `<option value="${categories.meals[i].strCategory}" required>${categories.meals[i].strCategory}</option>`;
        }

        for (let i = 0; i < areas.meals.length; i++) {
            areaOptions += `<option value="${areas.meals[i].strArea}" required>${areas.meals[i].strArea}</option>`;
        }
    
        renderWithTemplate(categoryOptions, category);
        renderWithTemplate(areaOptions, area);
    
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function createList(area, category) {
    const recipes = await getRecipesByAreaAndCategory(area, category);
    const recipeList = document.getElementById("recipe-list");
    let listItems = ``;
    
    // Clear the element when initially called
    recipeList.innerHTML='';

    try {
        if (recipes.length == 0) {
            listItems = `<p class="notice">Sorry, no recipes match your search parameters.</p>`
        } else {
            for (let i = 0; i < recipes.length && i <= 10; i++) {
                listItems += `<div class="recipe-card">
                <a href="recipe_pages/index.html?recipe=${recipes[i].meals[0].idMeal}">
                <img src="${recipes[i].meals[0].strMealThumb}" alt="Image of ${recipes[i].meals[0].strMeal}">
                <h3>${recipes[i].meals[0].strMeal}</h3>
                </a>
                <span class="mealID" hidden>${recipes[i].meals[0].idMeal}</span>
                <button class="add-meals" type="submit" value="submit">Add To Meal Plan</button>
            </div>`;
            }    
        }
        renderWithTemplate(listItems, recipeList);
    } catch (error) {
        console.error('Error:', error);
    }
}

selectorOptionsTemplate();