import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import FormUploader from "./componnet/FormUploader";
import CatgaroyUploader from './componnet/CatgaroyUploader';

// Initialize Firebase with your Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyCDLZBgltvio0vF_nSnVDX03Z9IDtkYQMU",
  authDomain: "outofcook.firebaseapp.com",
  projectId: "outofcook",
  storageBucket: "outofcook.appspot.com",
  messagingSenderId: "755923868479",
  appId: "1:755923868479:web:b52ba752211030994a918a",
});

const App = () => {
  const [currentPage, setCurrentPage] = useState("formUploader");

  const renderPage = () => {
    if (currentPage === "formUploader") {
      return <FormUploader />;
    } else if (currentPage === "catgaroyUploader") {
      return <CatgaroyUploader />;
    }
  };

  const goToNextPage = () => {
    setCurrentPage("catgaroyUploader");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Form Uploader</h1>
      {renderPage()}
      {currentPage === "formUploader" && (
        <button onClick={goToNextPage} style={styles.nextButton}>Next Page</button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  nextButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    position: 'fixed',
    bottom: 50
  },
};

export default App;