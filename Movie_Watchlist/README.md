# Movie Watchlist Project using React, Vite, and TMDB API:

A beginner-friendly project to **learn React** by building a **Movie Watchlist** using **Vite**, **React Router**, **TMDB API**, and core React concepts like **components, props, state, hooks**, and **context**.

<br>

## 🚀 Tech Stack

- ⚛️ React
- ⚡ Vite
- 🌐 React Router DOM
- 🧠 React Context
- 🎥 [TMDB API](https://www.themoviedb.org/documentation/api)
- 🧪 JSX, Props, State, useEffect

<br>
## 🌐 Live Demo

Versel :- Movie Watchlist Project  

<br>

## 🧠 Key Concepts & Features

### ✅ Getting Started
```bash
npm create vite@latest
cd Movie-Watchlist
npm install
npm run dev
```

### 📦 Files Overview
- package.json - Lists dependencies
- node_modules/ - Contains all installed packages
- index.html - Main HTML file where React mounts
- main.jsx - Renders the <App /> component
- App.jsx - Entry point for your components and routing


### 🧩 React Core Concepts
✅ Components – Functions returning JSX, start with Capital letters
✅ Fragments (<> </>) – Empty wrappers without extra DOM
✅ Props – Pass dynamic data to reusable components


### 🧠 Conditional Rendering
Render components based on a condition:
```jsx
{movieNumber === 1 ? (
  <MovieCard title="Ironman" release_date="2008" />
) : (
  <MovieCard title="Ironman 2" release_date="2012" />
)}
```

### 📃 Pages & Routing

Installed with:
```bash
npm install react-router-dom
```
- Navigates between pages using React Router


### 🔍 Search Functionality with .map()
- Dynamically render movie cards from API using .map() in Home.jsx
- Search form to fetch movie data from TMDB

### ⚙️ State Management
- Used useState to track search input, API data, and favorites
- Components automatically re-render when state updates

### 🌀 Side Effects with useEffect
- Fetch movie data from API on component mount or when state changes

### 🌍 React Context
- Used for global state management like favorite movies

### 🎯 Features
- 🔎 Search for movies
- ❤️ Add movies to a favorite list
- 📄 Conditional rendering
- 📦 Modular structure with reusable components