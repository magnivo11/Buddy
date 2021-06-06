import axios from "axios";
import React from 'react'


export default function UploadImage({ ownerID, type }) {
    const [FileName, setFileName] = React.useState("");



    const onChangeFile = e => {
        setFileName(e.target.files[0]);
    }

    const changeOnClick = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('link', FileName);
        formData.append('type', type);
        formData.append('ownerID', ownerID);
        axios.post(process.env.REACT_APP_SERVER_URL + '/photo/upload', formData);
        window.location = "/plant/" + ownerID;
 
    }

    return (
        <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="form-group">
                    <input type="file" name='link' className="form-control-file" onChange={onChangeFile}></input>
                 <button type="submit"><span>upload</span></button><br /><br />
            </div>




        </form>

    );
}
