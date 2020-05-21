import React from "react";

import { useFirebase } from "react-redux-firebase";

import FileUploader from "react-firebase-file-uploader";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const FileUpload = ({ setState, error, images }) => {
  const firebase = useFirebase();

  const handleUploadStart = () =>
    setState(prevState => {
      return { ...prevState, isUploading: true };
    });

  const handleUploadError = error => {
    setState(prevState => {
      return {
        ...prevState,
        isUploading: false
      };
    });
  };

  const handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
    setState(prevState => {
      return {
        ...prevState,
        images: [...prevState.images, { imageName: filename, downloadURL }]
      };
    });
  };
  const onFileDelete = (name, event) => {
    event.stopPropagation();
    event.preventDefault();
    return firebase.deleteFile(`images/${name}`).then(() => {
      setState(prevState => {
        return {
          ...prevState,
          images: images.filter(i => i.imageName !== name)
        };
      });
    });
  };

  return (
    <label>
      <Box
        border={error ? "1px solid red" : "1px solid #3f51b5"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        mb="20px"
        py="20px"
      >
        {images?.map(({ imageName, downloadURL }, ind) => (
          <img
            alt="Imagine"
            src={downloadURL}
            height="60px"
            width="60px"
            onClick={e => onFileDelete(imageName, e)}
            key={ind}
          />
        ))}
        {error ? (
          <Typography color="error">
            {"Adaugati cel putin o imagine pentru produs"}
          </Typography>
        ) : images.length <= 0 ? (
          "Adauga imagini"
        ) : null}
        <FileUploader
          accept="image/*"
          name="prodImages"
          hidden
          id="fileUpload"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          multiple
        />
      </Box>
    </label>
  );
};
export default FileUpload;
