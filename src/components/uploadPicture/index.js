import React, { useState, useEffect } from "react";
import { Box, LinearProgress, Grid, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { styled } from "@mui/material/styles";

const UploadPicture = ({ identityId, mainUser }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isSize, setIsSize] = React.useState(0);
  const [isBuffer, setIsBuffer] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [files, setFiles] = React.useState({});
  const [fileName, setFileName] = React.useState("");

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    return;
  };

  async function onChange(e) {
    onSelectFile(e);
    const file = e.target.files[0];
    try {
      await Storage.put(`${identityId}/${mainUser}/${file.name}`, file, {
        level: "protected",
        progressCallback(progress) {
          setIsUploading(true);
          setIsSize(progress.loaded);
          setIsBuffer(progress.total);
        },
        completeCallback: (event) => {
          setIsUploading(false);
        },
      });
    } catch (error) {
      setIsUploading(false);
    }
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split('.').pop();
  
    return file
      .arrayBuffer()
      .then(() => {
        return { file, key: `${identityId}/${mainUser}/${file.name}` };
      })
  };

  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="protected"
        maxFileCount={1}
        processFile={processFile}
        //path={`${identityId}/${mainUser}/${fileName}`}
        onFileRemove={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: undefined,
            };
          });
        }}
        onUploadError={(error, { key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'error',
              },
            };
          });
        }}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
        onUploadStart={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'uploading',
              },
            };
          });
        }}
      />
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
    </>
  );
};

export default UploadPicture;
