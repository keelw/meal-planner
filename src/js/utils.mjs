// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }

  // or a more concise version if you are into that sort of thing:
  // export const qs = (selector, parent = document) => parent.querySelector(selector);
  // retrieve data from localstorage
  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  // save data to local storage
    export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // set a listener for both touchend and click
  export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener("click", callback);
  }

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export async function loadHeaderFooter () {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");
    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
  }

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
  }

// render an item with the provided template
export function renderWithTemplate(template, parent, data, callback) {
    parent.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
  }

  export async function getAreas() {
    const url="https://www.themealdb.com/api/json/v1/1/list.php?a=list"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation.");
        return null;
    }
}

export async function getCategories() {
    const url="https://www.themealdb.com/api/json/v1/1/list.php?c=list"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation.");
        return null;
    }
}

export async function getRecipesByAreaAndCategory(area, category) {
    // Fetch meals by area
    const areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    if (!areaResponse.ok) {
        throw new Error('Network response was not ok.');
    }
    const areaData = await areaResponse.json();
    const mealsByArea = areaData.meals || [];

    // Fetch details for all meals
    const mealDetailsPromises = mealsByArea.map(async meal => {
        const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        if (!mealResponse.ok) {
            throw new Error('Network response was not ok.');
        }
        return mealResponse.json();
    });

    // Wait for all details to be fetched
    const mealDetails = await Promise.all(mealDetailsPromises);

    // Filter meals by category
    const filteredMeals = mealDetails.filter(mealData => {
        const mealCategory = mealData.meals[0].strCategory;
        return mealCategory === category;
    });

    return filteredMeals;
}