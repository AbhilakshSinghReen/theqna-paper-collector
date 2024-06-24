import { createContext, useState } from "react";

import { createDebouncedFunction } from "../utils/jsUtils";
import { defaultPaper, defaultPaperMedia } from "../config/defaults";

const GlobalStateContext = createContext();

function GlobalStateContextProvider({ children }) {
  const savedPaperStr = localStorage.getItem("paper");
  const savedPaperMediaStr = localStorage.getItem("paperMedia");

  const [paper, setPaper] = useState(savedPaperStr !== null ? JSON.parse(savedPaperStr) : defaultPaper);
  const setPaperAndSaveChanges = (updatedPaper) => {
    setPaper(updatedPaper);
    localStorage.setItem("paper", JSON.stringify(updatedPaper));
  };
  const debouncedSetPaperAndSaveChanges = createDebouncedFunction(setPaperAndSaveChanges, 2500);

  const [paperMedia, setPaperMedia] = useState(
    savedPaperMediaStr !== null ? JSON.parse(savedPaperMediaStr) : defaultPaperMedia
  );
  const setPaperMediaAndSaveChanges = (updatedPaperMedia) => {
    setPaperMedia(updatedPaperMedia);
    localStorage.setItem("paperMedia", JSON.stringify(updatedPaperMedia));
  };
  const debouncedSetPaperMediaAndSaveChanges = createDebouncedFunction(setPaperMediaAndSaveChanges, 2500);

  return (
    <GlobalStateContext.Provider
      value={{
        paper: paper,
        setPaper: debouncedSetPaperAndSaveChanges,
        paperMedia: paperMedia,
        setPaperMedia: debouncedSetPaperMediaAndSaveChanges,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export { GlobalStateContext, GlobalStateContextProvider };
