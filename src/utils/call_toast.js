import {toast} from "react-toastify";
import {theme} from "../theme/index.js";

export const callToast = (message) => toast.info(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});