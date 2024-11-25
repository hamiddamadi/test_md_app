// Import necessary modules from React library
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'
import Notification from './Components/Notification/Notification';
import GiveReviews from './Components/ReviewForm/ReviewForm'

// Function component for the main App
function App() {

    // Render the main App component
    return (
        <div className="App">
            {/* Set up BrowserRouter for routing */}
            <BrowserRouter>
                <Navbar />

                {/* Set up the Routes for different pages */}
                <Routes>
                    <Route path="/" element={<Landing_Page />} />
                    <Route path="/signup" element={<Sign_Up />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/instant-consultation" element={<InstantConsultation />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/reviews" element={<GiveReviews />} />
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// Export the App component as the default export
export default App;