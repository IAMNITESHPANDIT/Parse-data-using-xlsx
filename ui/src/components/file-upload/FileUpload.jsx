import React, { useState } from 'react';
import './fileupload.style.scss';
import { useFileUpload } from '../../hooks/useFileuplaod';
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const { error, data, loading } = useFileUpload(file);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (error) {
                console.error(null);
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    return (
        <div className="file-upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="upload-area">
                <input type="file" onChange={handleFileChange} />
                {file && <p>File: {file.name}</p>}
                {loading && <p>Uploading...</p>}
                {error && <p className="error">{error}</p>}
                {data.length > 0 && <p>Upload successful!</p>}
            </div>
            {file && 
            <button className="upload-button" onClick={() => setFile(null)}>
            Clear File
        </button>
            }
            
        </div>
    );
};

export default FileUpload;
