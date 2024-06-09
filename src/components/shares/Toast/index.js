
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (message) => {
  toast.success(message);
};

export const toastError = (message) => {
  toast.error(message);
};

