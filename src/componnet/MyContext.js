import React, { createContext, useState } from "react";

// Create the context
const MyContext = createContext({
  catgoryTitle: "",
  setCatgoryTitle: null,
});

// Create a provider component
const MyContextProvider = ({ children }) => {
  const [catgoryTitle, setCatgoryTitle] = useState("");

  // Provide the context value to the children components
  const value = { catgoryTitle, setCatgoryTitle };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export { MyContext, MyContextProvider };
