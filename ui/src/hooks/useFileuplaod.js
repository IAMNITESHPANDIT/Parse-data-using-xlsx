import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { ToastOnFailure, ToastOnSuccess } from "../utils/toaster";

export const useFileUpload = (file) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiCall = async (file) => {
        try {
            setLoading(true);
            const form = new FormData();
            form.append('file', file);
            const response = await fetch(process.env.REACT_APP_BASE_URL, {
                method: 'POST',
                body: form,
            });

            const result = await response.json();
            if(result.status===201) {
                setData(result);
                ToastOnSuccess('File Uploaded')
                setTimeout(()=>{
                window.location.reload();
                }, 2000)
            }else{
                ToastOnFailure(result.message)
                setError(result.message);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (file) => {
        if (file) {
            apiCall(file);
        }
    };

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    return { error, data, loading };
};
