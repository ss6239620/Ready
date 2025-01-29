import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { darkColorTheme } from "../../constant";

export default function CircularFileInput({ style, setFile, file }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFile(file);
        } else {
            alert("Please select a valid image file (e.g., .jpg, .png, .gif).");
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setFile(file);
        } else {
            alert("Please select a valid image file (e.g., .jpg, .png, .gif).");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const cancelFile = () => {
        setFile(null);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
                className="div-center"
                style={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    border: file ? "none" : "2px dashed white",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden", // Ensures the image fits inside the circular shape
                    ...style,
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {!file && (
                    <>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <FaCloudUploadAlt size={20} />
                            <p  className="small-text-normal-weight secondary-text">
                                Upload Photo
                            </p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                            }}
                            onChange={handleFileChange}
                        />
                    </>
                )}
                {file && (
                    <div style={{ width: "100%", height: "100%" }}>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Uploaded file"
                            className="img-small-style w-[100%!important] h-[100%!important] "
                        />
                        <div
                            className="secondary-bg"
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                padding: 5,
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                            onClick={cancelFile}
                        >
                            <MdCancel size={16} color="white" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
