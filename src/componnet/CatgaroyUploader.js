import React, { useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { MyContext } from "./MyContext";
const CatgaroyUploader = () => {
  const [items, setItems] = useState("");
  const { catgoryTitle } = useContext(MyContext);
  console.log(catgoryTitle);
  const handleUpload = () => {
    const firestore = firebase.firestore();
    const collectionRef = firestore.collection("categories");

    const itemArray = items.split("\n");

    const customDocId = catgoryTitle; // Replace "custom-doc-id" with your desired document ID

    collectionRef
      .doc(customDocId)
      .set({ items: itemArray })
      .then(() => {
        console.log("Items uploaded successfully!");
        setItems("");
      })
      .catch((error) => {
        console.error("Error uploading items:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Category Uploader</h2>
      <textarea
        value={items}
        onChange={(e) => setItems(e.target.value)}
        placeholder="Enter items (one per line)"
        rows={5}
        cols={30}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleUpload} style={styles.button}>
        Upload
      </button>
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
  textarea: {
    width: "90vw",
    padding: "10px",
    marginBottom: "10px",
    resize: "vertical",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CatgaroyUploader;
