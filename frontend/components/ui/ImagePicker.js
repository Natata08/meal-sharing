"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImagePicker({ label, name, onChange }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setUploadedImage(null);
      return;
    }
    onChange();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setUploadedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <Grid container spacing={2} alignItems='flex-start' mt={2}>
      <Box sx={{ border: "1px solid grey", height: 100, width: 100 }}>
        {!uploadedImage && (
          <Typography variant='body2' align='center' color='grey' m={1}>
            No image uploaded yet
          </Typography>
        )}
        {uploadedImage && (
          <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
            <Image
              src={uploadedImage}
              alt='The image uploaded by a user'
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}
      </Box>
      <label htmlFor={name} hidden>
        {label}
      </label>
      <input
        type='file'
        id={name}
        name={name}
        accept='image/png, image/jpeg'
        hidden
        ref={imageInputRef}
        onChange={handleImageChange}
      />
      <Button
        variant='outlined'
        component='button'
        type='button'
        size='small'
        onClick={handleUploadClick}
      >
        Upload image
      </Button>
    </Grid>
  );
}
