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

