import React, { createContext, useState, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Snackbar from "../components/Snackbar";

export const SnackbarContext = createContext({
  snackbar: { open: false, message: "", type: "info" },
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    type: "info",
    timeOut: 5000 
  });
  const timeoutRef = useRef(null);

  const hideSnackbar = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback(({ message, type = "info", timeOut = 5000 }) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setSnackbar({ 
      open: true, 
      message, 
      type,
      timeOut,
      key: Date.now() 
    });

    timeoutRef.current = setTimeout(() => {
      hideSnackbar();
    }, timeOut);
  }, [hideSnackbar]);

  const value = useMemo(() => ({ 
    snackbar, 
    showSnackbar, 
    hideSnackbar 
  }), [snackbar, showSnackbar, hideSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar snackbar={snackbar} onClose={hideSnackbar} />
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};

export default SnackbarProvider;