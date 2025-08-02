import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Register from "../pages/Register.jsx";
import registerAction from "./actions/registerAction";
import Login from "../pages/Login.jsx";
import loginAction from "./actions/loginAction";
import registerLoader from "./loaders/registerLoader.js";
import loginLoader from "./loaders/loginLoader.js";
import ResetLink from "../pages/ResetLink.jsx";
import resetLinkAction from './actions/resetLinkAction.js';
import ResetPassword from "../pages/ResetPassword.jsx";
import resetPasswordAction from "./actions/resetPasswordAction.js";
import resetLinkLoader from "./loaders/resetLinkLoader.js";
import resetPasswordLoader from "./loaders/resetPasswordLoader.js";
import appLoader from "./loaders/appLoader.js";
import appAction from "./actions/appAction.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: appLoader,
        action: appAction,
    },
    {
        path: "/register",
        element: <Register />,
        loader: registerLoader,
        action: registerAction,
    },
    {
        path: "/login",
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
    },{
        path: "/reset-link",
        element: <ResetLink />,
        action: resetLinkAction,
        loader: resetLinkLoader,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
        action: resetPasswordAction,
        loader: resetPasswordLoader,
    }
])

export default router;