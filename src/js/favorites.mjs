import { renderWithTemplate, loadHeaderFooter, getParam, getMealById, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

// Add the items to the meal plan section
export async function addToFavorites(mealID) {
    let favorites = await getLocalStorage("favorites");

    if (favorites != null) {
        favorites.push(mealID);
        setLocalStorage("favorites", favorites);
    } else {
        favorites = mealID;
        setLocalStorage("favorites", Array(favorites));
    }
}

// Remove items from the meal plan section
export async function removeFromFavorites(mealID) {
    let favorites = await getLocalStorage("favorites");
    const index = favorites.indexOf(mealID)

    if (favorites != null) {
        if (index > - 1) {
            favorites.splice(index, 1);
        }
        setLocalStorage("favorites", favorites);
    } else {
        return
    }
}

// Create the meal plan section
export async function favoritesPageTemplate() {
    try {
        let favorites = await getLocalStorage("favorites");
        const favoritesElement = document.getElementById("favorite-meals");

        if (favoritesElement != null) {
            favoritesElement.innerHTML='';
        
            let favoritesRendered = "<h1 id='favorite-header'>My Favorite Meals</h1>";

            if (favorites != null && favorites.length > 0) {
                for(let i=0; i < favorites.length; i++) {
                    let meal = await getMealById(favorites[i]);
                    favoritesRendered += `<div class="recipe-card">
                    <a href="recipe_pages/index.html?recipe=${meal.meals[0].idMeal}">
                    <img src="${meal.meals[0].strMealThumb}" alt="Image of ${meal.meals[0].strMeal}">
                    <h3>${meal.meals[0].strMeal}</h3>
                    </a>
                    <span class="mealID" hidden>${meal.meals[0].idMeal}</span>
                    <button class="remove-favorites" type="submit" value="submit">Un-favorite this Meal</button>
                    </div>`
                }
    
            } else {
                favoritesRendered += `<p class="notice">You do not currently have any items in your meal plan.</p>`;
            }
    
            renderWithTemplate(favoritesRendered, favoritesElement)    
        
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event delegation for dynamically created buttons
document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('remove-favorites')) {
        const idElement = event.target.previousElementSibling;
        const mealID = idElement.textContent;
        await removeFromFavorites(mealID);
        await favoritesPageTemplate();
    }
})

favoritesPageTemplate();