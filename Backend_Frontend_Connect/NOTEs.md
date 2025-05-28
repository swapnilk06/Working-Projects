# Backend Frontend Connection | Fullstack Proxy & CORS

## Simple Appln -  Simple joke can serve


- [x] Backend installation
- `npm init` -> package.json
- `npm i express` -> For routing
- `touch index.js` -> main file

- [x] `process.env.PORT` 100% required in production i.e AWS, Digital Ocean (not hard code port only)


- [x] Server ready `index.js`
```js
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Server is ready');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
	}
);
```

- [x] After that gives error 
- <b>SyntaxError</b>: Cannot use import statement outside a module
	- we use module js(i.e. `import express from 'express';`) 
	- then add `"type": "module"` in -> "package.json"

- [x] Error without "/" i.e. `app.get('/jokes',....`
- Send jokes array in -> "index.js"
```js
app.get('/jokes', (req, res) => {
	const jokes = [
		{
			id: 1,
			title: 'A joke',
			content: 'This is a joke'
		},
		{
			id: 2,
			title: 'Another joke',
			content: 'This is another joke'
		},
		{
			id: 3,
			title: 'A third joke',
			content: 'This is a third joke'
		},
		{
			id: 4,
			title: 'A fourth joke',
			content: 'This is fourth joke'
		},
		{
			id: 5,
			title: 'A fifth joke',
			content: 'This is fifth joke'
		},
	];
	res.send(jokes);
});
```
- We are creating simple API i.e. array in -> `http://localhost:3000/jokes`

> [!NOTE]
> - Check or read API or json code in online json formattor for easy to visualize.


#### How to backend data consume in frontend?

- [x] In frontend how to make appln?
- Bulid `react appln using bundlers(toolchain)`: vite or create react app or parsel...
- `toolchain` -> help to bundle html,js at end of.

- [x] Frontend installation
- `npm create vite@latest .` -> bundler

- `App.jsx`
```jsx
 {
 return (
    <>
      <h1>Chai and full stack</h1>
      <p>JOKES: {jokes.length}</p>

      {
        jokes.map((joke, index) => (
          <div key={joke.id}>
          	<h3>{joke.title}</h3>
          	<p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
```

- [x] Think behind how API request send?
- using `fetch`, `axios`, `react query`...

> [!NOTE]
> - Without requirement don't choose aything

- `npm i axios` -> similar of fetch & `axios` gives over the top additional features.
- `axios library` -> That library `specially write to make a web request`.
- Production level feature in axios like :-
	- How data came?
	- Failed situation/Loading situation?
	- When send request stop for API key adding.

axios in -> "App.jsx"
```jsx
useEffect(() => {
    axios.get('http://localhost:3000/jokes')
    .then((resonse) => {
      setJokes(response.data)
    }
    )
    .catch((error) => {
      console.log(error)
    }
    )
  })
```

#### Error : CORS - Cross Origin Request
-In console give Error -> `CORS policy`

- [x] `CORS` - It provide safety to our appln
- e.g. In home origin person allowed to entered in home not other like, sales person.

- [x] URL & PORT number -> Boths are different then it `Cross Origin`.


> [!NOTE]
> - CORS depend on what a usecase?
> 	- e.g. In github any can request.


#### Handle CORS Errors
- [x] Standarization of API -> `app.get('/api/jokes',...`
- [x] API standarization make same for frontend `App.jsx` -> `axios.get('http://localhost:3000/api/jokes')`
- [x] But that url `http://localhost:3000` not make sense
- Standarize ->
```jsx
axios.get('http://localhost:3000/api/jokes')
    .then((resonse) => {
      setJokes(response.data)
    }
		)
```

- After standarize request it give ERROR - `http://localhost:3000/api/jokes` 404(Not Found)

- [x] That solve through `proxy` concept

#### Proxy
- Add proxy in "vite.config.js"
```jsx
defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [react()],
})
```
- That means automatically any request send from that toolchain then automatically `detect`.
- Not only append, add proxy for request came from that url `http://localhost:3000`.
- In `proxy` server think, url request(/api) originated from that `http://localhost:3000`

- [x] Server think request from same origin.

- [x] In production change vite configuration change api request come from host aws or digital ocean.
- Change that url
```jsx
server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
```

### Error Resolve : Not showing ouptut
App.jsx
``` jsx
      {
        jokes.map((joke, index) => {
          <div key={joke.id}>
						<h3>{joke.title}</h3>
						<p>{joke.content}</p>
          </div>
        })
      }
```
- in jokes.map() we can use `{}` curly brases that `required to return` i.e.
```jsx
jokes.map((joke, index) => {
          <div key={joke.id}>
						<h3>{joke.title}</h3>
						<p>{joke.content}</p>
          </div>
        })
```
- We can use `()` paranthesis don't required to used return.
```jsx
jokes.map((joke, index) => (
          <div key={joke.id}>
						<h3>{joke.title}</h3>
						<p>{joke.content}</p>
          </div>
				))
```


> [!NOTE]
> - We can not understand <b>useEffect</b> whenever we can add dependency in -> useEffect (....}, [jokes])
> - In that not required dependency array.


> [!IMPORTANT]
> - `CORS` have soln 
>		- Proxy
>   - Whitelisting in server


