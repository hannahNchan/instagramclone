import React, { useEffect, useState } from "react";
import { Amplify, Storage, API } from "aws-amplify";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";
import * as queries from '../../graphql/queries';

import PhotoGrid from "../../ui/photoGrid";

const FeedExternal = () => {
  const routeParams = useParams();
  const [images, setImages] = useState([]);
  const { accountId } = routeParams;

  useEffect(() => {
    handleWatchFeed();
  }, []);

  async function handleWatchFeed() {
    const s3Bucket = Amplify.configure()["aws_user_files_s3_bucket"];
    let imagesTemp = [];

    const { data } = await API.graphql({
      query: queries.usersByUserName,
      variables: { userName: accountId, limit: 1 }
    });
    Storage.list("", { level: "protected", identityId: data.usersByUserName.items[0].identityPoolId })
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

  return (
    <div>
      {images.length !== 0 &&
        images.map((item, index) => {
          return (
            <div>
              <img src={item.url} alt={item.key} width="160" />
            </div>
          )
        })}
    </div>
  );
};

export default FeedExternal;
