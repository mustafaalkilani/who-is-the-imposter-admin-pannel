import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { MyContext } from "./MyContext";
import CatgaroyUploader from "./CatgaroyUploader";
const theme = createTheme();

const FormUploader = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1683143726325-ee14e56ab69c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80"
  );
  const { setCatgoryTitle } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState("formUploader");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const firestore = firebase.firestore();
      const collectionRef = firestore.collection("dataform");

      // Generate a new ID for the document
      const docRef = collectionRef.doc();
      const newId = docRef.id;

      // Upload the user-entered data to Firestore
      await docRef.set({
        id: newId,
        title,
        image,
      });
      setCatgoryTitle(title);
      setTitle("");
      setImage("");

      console.log("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
    setCurrentPage("catgaroyUploader");
  };

  const renderPage = () => {
    if (currentPage === "catgaroyUploader") {
      return <CatgaroyUploader />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        {currentPage === "formUploader" ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit} fullWidth>
                Upload
              </Button>
            </Grid>
          </Grid>
        </>
        ): renderPage()}
      </FormContainer>
    </ThemeProvider>
  );
};

const FormContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export default FormUploader;
