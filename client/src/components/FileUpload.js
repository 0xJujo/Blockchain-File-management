// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// const FileUpload = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `Enter Your Key`,
//             pinata_secret_api_key: `Enter Your Secret Key`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         contract.add(account,ImgHash);
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };
// export default FileUpload;

import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
function FileUpload({ contract, provider, account }) {
  // const [urlArr, setUrlArr] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `0178b20cf8fb7f36e4a5`,
              pinata_secret_api_key: `a2e0fabeeae2e828fc7caabf0ccc6e9d53dfe43e5f3a0fef32f3fb374a3bf83a`,
              "Content-Type": "multipart/form-data",
            },
          });

          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash);
          const signer = contract.connect(provider.getSigner());
          signer.add(account, ImgHash);

          //setUrlArr((prev) => [...prev, ImgHash]);

          //Take a look at your Pinata Pinned section, you will see a new file added to you list.
        } catch (error) {
          alert("Error sending File to IPFS");
          console.log(error);
        }
      }

      alert("Successfully Uploaded");
      setFileName("No image selected");
      setFile(null); //to again disable the upload button after upload
    } catch (error) {
      console.log(error.message); //this mostly occurse when net is not working
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          {/*turn around for avoding choose file */}
          Choose Image
        </label>
        <input
          disabled={!account} //disabling button when metamask account is not connected
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        {/* choose file */}
        <button type="submit" disabled={!file} className="upload">
          Upload file
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
