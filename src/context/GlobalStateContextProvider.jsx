import { createContext, useState, useCallback, useMemo } from "react";

import { defaultPaper, defaultPaperMedia } from "../config/defaults";

import { debounce } from "lodash";

function createDebouncedFunction(func, waitTime, markDebouncingStarted = null) {
  if (markDebouncingStarted !== null) {
    markDebouncingStarted();
  }

  return debounce(func, waitTime);
}

const GlobalStateContext = createContext();

function GlobalStateContextProvider({ children }) {
  const savedPaperStr = localStorage.getItem("paper");
  const savedPaperMediaStr = localStorage.getItem("paperMedia");

  const [paper, setPaper] = useState(savedPaperStr !== null ? JSON.parse(savedPaperStr) : defaultPaper);
  const [isUpdatingPaper, setIsUpdatingPaper] = useState(false);
  const setPaperAndSaveChanges = (updatedPaper) => {
    setPaper(updatedPaper);
    localStorage.setItem("paper", JSON.stringify(updatedPaper));
    setIsUpdatingPaper(false);
  };
  const debouncedSetPaperAndSaveChanges = createDebouncedFunction(setPaperAndSaveChanges, 2500);
  const debouncedSetPaperAndSaveChangesWithUpdatingNotification = useCallback((updatedPaper) => {
    setIsUpdatingPaper(true);
    debouncedSetPaperAndSaveChanges(updatedPaper);
  }, []);

  const [paperMedia, setPaperMedia] = useState(
    savedPaperMediaStr !== null ? JSON.parse(savedPaperMediaStr) : defaultPaperMedia
  );
  const [isUpdatingPaperMedia, setIsUpdatingPaperMedia] = useState(false);
  const setPaperMediaAndSaveChanges = (updatedPaperMedia) => {
    setPaperMedia(updatedPaperMedia);
    localStorage.setItem("paperMedia", JSON.stringify(updatedPaperMedia));
    setIsUpdatingPaperMedia(false);
  };
  const debouncedSetPaperMediaAndSaveChanges = createDebouncedFunction(setPaperMediaAndSaveChanges, 2500);
  const debouncedSetPaperMediaAndSaveChangesWithUpdatingNotification = useCallback((updatedPaperMedia) => {
    setIsUpdatingPaperMedia(true);
    debouncedSetPaperMediaAndSaveChanges(updatedPaperMedia);
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        paper: paper,
        setPaper: debouncedSetPaperAndSaveChangesWithUpdatingNotification,
        isUpdatingPaper: isUpdatingPaper,
        paperMedia: paperMedia,
        setPaperMedia: debouncedSetPaperMediaAndSaveChangesWithUpdatingNotification,
        isUpdatingPaperMedia: isUpdatingPaperMedia,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export { GlobalStateContext, GlobalStateContextProvider };
