import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reusable function to show toast
export const showToast = (message, type = "success") => {
  if (type === "success") toast.success(message);
  else if (type === "error") toast.error(message); // red color
  else toast.info(message);
};


export default function ToastContainerWrapper() {
  return <ToastContainer position="top-right" autoClose={3000}  style={{ top: "80px" }}/>;
}