# sleepoutside

## Description

Use this as a starting point to complete the WDD 330 team activity: the SleepOutside web application. It scaffolds out a simple web app with Vite support to bundle up our assets.

## Prerequisites

- You must have Node installed. visit https://byui-cit.github.io/advcss/lesson01/l01-software.html and skip to the Node section for instructions

## Setup

- `npm install`
- `npm run start` starts up a local server and updates on any JS or CSS/SCSS changes.

## Other commands

- `npm run build` to build final files when you are ready to turn in.
- `npm run lint` to run ESLint against your code to find errors.
- `npm run format` to run Prettier to automatically format your code.

## Robust JavaScript Programming Logic
- This can be demonstrated in the meal-selector.js, recipe-page.mjs, utils.mjs, and main.js files which all show examples of non-trivial work. A lot of which is outside the bounds of the given examples of class. 

## Extensive use of API(s) was used effectively to produce a rich experience
- This was accomplished by using 5 different endpoints in the utils.mjs file which fetched data which was manipulated in several different ways using robust javascript as descriped above. 

## Entensive use of non-trivial JSON data to provide a dynamic website experience
- This was accomplished by using the mealDB API (free) where each endpoint returned around 60 lines of JSON where the average object I worked with during this project probably had around 25 attributes.

## Advanced features of CSS were used in multiple places and evident
- A banner that is marked as hidden unless it is the users first time visiting the site
- Upon loading the "recipe helper" headline is animated
- The select options are styles
- Hovering over the "remove" buttons has a polished animated transition that takes .4seconds so that it is a more appealing hover
- Hovering over the "add" buttons has a polished animated transition that takes .4seconds so that it is a more appealing hover
- Hovering over the "favorite" buttons has a polished animated transition that takes .4seconds so that it is a more appealing hover
- Favorites page has a colorful animation in the title
- 

## Multiple kinds of events were used to produce a responsive experience
- Every link has a hover attribute
- The page is dynamic and always fits the size of the users screen

## Local storage was used to save and retrieve properties to enhance site experience
- The number of visits a user has is stored to display a banner on first visit
- An array containing the current meal plan (by mealID) is stored
- An array containing a list of the users favorite meals (by mealID) is stored