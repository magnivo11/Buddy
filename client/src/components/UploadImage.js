import axios from "axios";
import React from 'react'


export default function UploadImage({ ownerID, type }) {
    const [FileName, setFileName] = React.useState("");

    const buttonOnClick = e => {
        document.getElementById('file-input').click()
    };

    const onChangeFile = e => {
        setFileName(e.target.files[0]);
    }

    const changeOnClick = (e) => {
        e.preventDefault();
        if(FileName !== ""){
            var formData = new FormData();
            formData.append('link', FileName);
            formData.append('type', type);
            formData.append('ownerID', ownerID);
            axios.post(process.env.REACT_APP_SERVER_URL + '/photo/upload', formData).then(res => {
            });
            window.location = "/plant/" + ownerID;
        }
 
    }
    return (
        <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="form-group">
                    <button style={{ width: '120px', background: 'white', margingRight: '10px'}} type="button" className="button" onClick={buttonOnClick}><span style={{ color: 'black' }} >Select Photo</span></button>
                    <input id="file-input" name='link' className="form-control-file" type="file" name="name" onChange={onChangeFile} style={{display: "none"}} />        
                    {/* <input type="file" name='link' className="form-control-file" onChange={onChangeFile}></input> */}
                 <button style={{ width: '120px', background: 'rgb(205, 164, 94)' }} type="button" className="button" type="submit"><span style={{ color: 'black' }} >Upload</span></button><br /><br />
            </div>




        </form>

    );
}
