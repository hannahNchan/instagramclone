import React, { useEffect, useState } from "react";
import { Amplify, Storage } from "aws-amplify";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import PhotoGrid from "../../ui/photoGrid";

const MyAccount = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    handleWatchFeed();
  }, []);

  async function handleWatchFeed() {
    const s3Bucket = Amplify.configure()["aws_user_files_s3_bucket"];
    let imagesTemp = [];
    Storage.list("", { level: "protected" })
      .then(({ results }) => {
        console.log(results);
        results.forEach(async (imageObject) => {
          const objectKey = imageObject.key;
          if (objectKey !== undefined) {
            imagesTemp.push({
              key: objectKey,
              url: encodeURI(
                `https://${s3Bucket}.s3.amazonaws.com/protected/${
                  objectKey.split("/")[0]
                }/${objectKey}`
              ),
            });
          }
        });
        setImages([...imagesTemp]);
      })
      .catch((err) => console.log(err));
  }

  const deleteImage = async (index) => {
    const newList = images.filter((_, ind) => ind !== index);
    setImages(newList);
    await Storage.remove(images[index].key, { level: 'protected' });
  }

  return (
    <div>
      {images.length !== 0 &&
        images.map((item, index) => {
          return (
            <div>
              <img src={item.url} alt={item.key} width="160" />
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteImage(index)}>
                Delete
              </Button>
            </div>
          )
        })}
    </div>
  );
};

export default MyAccount;
