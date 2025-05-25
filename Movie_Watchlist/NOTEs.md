# Learn React with Movie Project

### Installation
- [x] vite -> `npm create vite@latest`

### What is in that?
`package.json` -> Dependencies
`node_modules` -> Code all dependencies
`index.html` -> Inject react code
`main.jsx` -> Rendering our react inside 
`App.jsx` -> Start writing the code

- [x]`Component` is really just any function in JavaScript that returns some kind of `JSX code`.
	- Component always start with capital letter.
- [x] `<>` -> Fragment - just kind of a placeholder for parent element.
	- It's simply just an empty HTML tag.
- [x] `prop` -> Property - reusable component.
	- Dynamically display we can pass as many as props.

- Passing display props example - App.jsx
```jsx
import "./App.css";

function App() {
	return (
		<> 
			<Text display="what up"/>
			<Text display="hello"/>
		</>
	);
}

fuction Text({display}) {
	return (
		<div>
			<p>{display}</p>
		</div>
	);
}
export default App;
```


-[x] Movie card component
- What type of `component` do I need?
	- Display different info about movies
- Create seperate in components. i.e. MovieCard.jsx


-[x] Conditional Rendering
Conditional based rendering example - MovieCard.jsx
```jsx
import "./App.css";
import MovieCard from "./components/MovieCard"

function App() {
	const movieNumber = 1;

	return (
		<>
			{movieNumber === 1 ? (
				<MovieCard={{title: "Ironman", relase_date: "2008"}}/>
	 		) : (
				<MovieCard={{title: "Ironman2", relase_date: "2012"}}/>
			)}
		</>
		{/* OR */}
		{/* 
			<>
			{movieNumber === 1 && <MovieCard={{title: "Ironman2", relase_date: "2012"}}/>}
			</>
		*/}
	);
}
export default App;
```

- [x] Create new folder page in src
- unique pages navigates using `page router`

- [x] Home page `Home.jsx` & .map()
- search form setup
- `.map()` -> to dynamically render typically an array of values in Home.jsx
```jsx
import MovieCard from "../components/MovieCard"
function Home() {
	const movie = [
		{id:1, title: "John Wick", release_date: "2020"},
		{id:2, title: "Terminator", release_date: "1999"},
		{id:3, title: "The Maze Runner", release_date: "2014"},
	];

	return <div className="home">
		<div className="movies-grid">
			{movies.map((movie) => (
				<MovieCard movie={movie} key={movie.id} />
				))}
		</div>
	</div>
}
```

- [x] `State` - is something where once it's updated, the component will change and re-reder itself to show the new state.

Home.jsx
```jsx
import MovieCard from "../components/MovieCard";
import { useState} from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
	const movies = [
		{id:1, title: "John Wick", release_date: "2020"},
		{id:2, title: "Terminator", release_date: "1999"},
		{id:3, title: "The Maze Runner", release_date: "2014"},
	];
	

  const handleSearch = (e) => {
    e.preventDefault();
		alert(searchQuery);
		setSearchQuery("");
	};

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

			<div className="movies-grid">
				{movies.map
					((movie) => 
					movie.title.toLowerCase().startsWith(searchQuery) && (
						<movieCard movie={movie} key={movie.id} />
					)
				)}
			</div>
    </div>
  );
}

export default Home;
```
- When a `state change` occurs, the entire components is re-rendered.


- [x] Install React Router
- `npm install react-router-dom` 
- [x] Page Routing - 


- [x] `UseEffect` - allows you to add side effects to your functions or to your components and define when they should run.

- [x] `React Context` - allow state to be globally available to anything that's within the provided context.

