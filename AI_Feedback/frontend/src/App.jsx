import { useState } from 'react'

import FeedbackForm from "./components/FeedbackForm";

import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <FeedbackForm />
    </div>
  );
}

export default App;