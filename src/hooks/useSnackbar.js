import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext.jsx";

export const useSnackbar = () => useContext(SnackbarContext);