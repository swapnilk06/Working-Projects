# Portfolio Site


This is a ** portfolio website** built using **ReactJS**, **Tailwind CSS**, and **Vite**.
- Focused on applying the basics of responsive design, component structure, and modern frontend workflow.

---

## 🚀 Tech Stack

- **React JS** – Frontend Library
- **Vite** – Build tool for fast development
- **Tailwind CSS** – Utility-first CSS framework

---


## 🌐 Live Demo

Versel :- 

---

### Working Installation

## React installation steps using vite framework :-

Step 1]
  - `npm create vite@latest`

Step 2]
  - Add project name : `__project_name__`
  - Select a package name : `__project_name__`
  - Select a framework : `React`
  - Select a variant : `JavaScript`

Step 3]
  - `cd __project_name__`
  - `npm install`

Step 4]
  - `npm run dev`


## Tailwind CSS through framework Vite steps :-

Step 1] Tailwind through vite
  - `npm install tailwindcss @tailwindcss/vite`


Step 2] Update in -> `vite.config.js`
  - configure vite  : `src/vite.config.js`
```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    
  })
```

Step 3] Update in -> `index.css`
  - import Tailwind to path :  `src/index.css`  
  ```
  @import "tailwindcss";
  
  /* use for tailwind CSS suggestion showing */
  @tailwind utilities;
  


Step 4] Run that
  - `npm run dev`

Step 5] Update in -> `App.jsx`
- Check tailwindCSS suggestion working : `src/App.jsx`
```jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-orange-400 text-black p-4 rounded-xl'>Tailwind test</h1>
    </>
  )
}

export default App

```