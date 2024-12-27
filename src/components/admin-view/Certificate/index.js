"use client";
require("dotenv").config();
import React, { useState, useEffect} from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function AdminCertificateView() {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [publicIds, setPublicIds] = useState([]);

  useEffect(() => {
    const fetchPublicIds = async () => {
      try {
        const response = await fetch("/api/image/get");
        const result = await response.json();
        if (result.success) {
          setPublicIds(result.data); // Set the publicIds state
        }
      } catch (error) {
        console.error("Error fetching public IDs:", error);
      }
    };

    fetchPublicIds();
  }, []);

  return (
    <div className="justify-around flex content-center items-center flex-nowrap flex-col">
      <div>
        <h1 className="font-bold">Upload File to Cloudinary</h1>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={async (result) => {
            // Access the uploaded image URL and public ID
            const uploadedImage = result.info.secure_url; // URL of the uploaded image
            const uploadedPublicId = result.info.public_id; // Public ID of the uploaded image

            // Set the state with the URL and public ID
            setImageUrl(uploadedImage);
            setPublicId(uploadedPublicId);

            // Create a new FormData object
            const formData = new FormData();
            formData.append("url", uploadedImage); // Add the image URL to FormData
            formData.append("publicId", uploadedPublicId); // Add the public ID to FormData

            // Send the FormData to the API
            try {
              const response = await fetch("/api/image/add", {
                method: "POST",
                body: formData,
              });

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const result = await response.json();
              console.log(result); // Log the response from the server
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          }}
        >
          {({ open }) => {
            return <button onClick={() => open()} className="bg-yellow-main text-cyan-50 rounded-none justify-center">Upload an Image</button>;
          }}
        </CldUploadWidget>
      </div>

      <div>
        {imageUrl && (
          <div>
            <h2>Uploaded Image:</h2>
            <CldImage width="300" height="300" src={publicId} />
          </div>
        )}
      </div>

      <Carousel className="flex text-center w-[800] mt-[100px]">
        <CarouselContent>
            {publicIds.map((id, index) => (
               <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3" key={index}>
                <CldImage width="200" height="200" src={id} />
               </CarouselItem> 
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
