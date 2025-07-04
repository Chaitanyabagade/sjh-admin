//const Uploadimg = () => {
import React, { useState } from 'react';

function Uploadimg() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        // Replace with your server URL
        fetch(`${process.env.REACT_APP_domain}/uploandimg/uploadimg.php`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to upload file.');
            });
    };

    return (
        <div className='pt-[200px]'>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
}

export default Uploadimg;
 