import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Register from "../pages/Register.jsx";
import registerAction from "./actions/registerAction";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/register",
        element: <Register />,
        action: registerAction,
    }
])

export default router;