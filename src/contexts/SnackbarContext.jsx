import React, {
    createContext,
    useState,
    useRef,
    useMemo,
    useCallback,
  } from "react";
  import PropTypes from "prop-types";
  import Snackbar from "../components/Snackbar";
  
  // Initial context value with empty functions for type safety
  const initialCtxValue = {
    snackbar: {
      open: false,
      message: '',
      type: 'info',
    },
    showSnackbar: () => {},
    hideSnackbar: () => {},
  };
  
  // Create context
  export const SnackbarContext = createContext(initialCtxValue);
  
  // Provider component
  const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      type: 'info',
    });
  
    const timeoutRef = useRef();
  
    // Function to manually hide the snackbar
    const hideSnackbar = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setSnackbar({ open: false, message: '', type: 'info' });
    }, []);
  
    // Function to show the snackbar
    const showSnackbar = useCallback(
      ({ message, type = 'info', timeOut = 5000 }) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
  
        setSnackbar({
          open: true,
          message,
          type,
        });
  
        timeoutRef.current = setTimeout(() => {
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }));
        }, timeOut);
      },
      []
    );
  
    // Memoized context value
    const contextValue = useMemo(() => {
      return { showSnackbar, hideSnackbar };
    }, [showSnackbar, hideSnackbar]);
  
    return (
      <SnackbarContext.Provider value={contextValue}>
        {children}
        <Snackbar snackbar={snackbar} />
      </SnackbarContext.Provider>
    );
  };
  
  SnackbarProvider.propTypes = {
    children: PropTypes.any,
  };
  
  export default SnackbarProvider;
  