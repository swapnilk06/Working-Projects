import { useState } from 'react'
import { Toaster } from 'react-hot-toast'; // ✅ Import Toaster

import FeedbackForm from "./components/FeedbackForm";

import "./index.css";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> 
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FeedbackForm />
      </div>
    </>
  );
}

export default App;