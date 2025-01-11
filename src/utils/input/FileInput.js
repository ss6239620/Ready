import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../../asset/css/util.css";
import { AiOutlineDelete } from "react-icons/ai";
import { darkColorTheme } from "../../constant";


export default function FileInput({ fileTypes = [], style, setFile, file }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (fileTypes.length === 0 || fileTypes.some(type => file.type.includes(type)))) {
            setFile(file);
        } else {
            alert(`Please select a valid file. Supported types: ${fileTypes.join(", ")}`);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && (fileTypes.length === 0 || fileTypes.some(type => file.type.includes(type)))) {
            setFile(file);
        } else {
            alert(`Please select a valid file. Supported types: ${fileTypes.join(", ")}`);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const cancelFile = (event) => {
        event.preventDefault();
        setFile(null);
    };

    const acceptedTypes = fileTypes.length > 0 ? fileTypes.map(type => `${type}/*`).join(",") : "*";


    return (
        <div
            style={{
                border: file ? 'none' : '0.5px dashed #666',
                borderRadius: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                ...style,
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {!file &&
                <>
                    <div style={{ display: "flex", alignItems: "center", paddingBlock: 60 }}>
                        <p style={{ marginInline: 20 }}>Drag and Drop or Upload Media</p>
                        <FaCloudUploadAlt size={25} />
                    </div>
                    <input
                        type="file"
                        accept={acceptedTypes}
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
            }
            {file &&
                <div style={{
                    width: '100%',
                    height: '100%',
                }}>
                    {file.type.startsWith("video/") ? (
                        <video
                            src={URL.createObjectURL(file)}
                            controls
                            style={{
                                width: "100%",
                                maxHeight: "400px",
                                objectFit: "cover",
                                display: "block", // Removes extra space under video
                                borderRadius: 30
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position:'relative',
                            borderRadius: 30,
                            overflow:'hidden',
                            border:'1px solid gray'
                        }}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Uploaded file"
                                style={{
                                    width: "100%",
                                    maxHeight: "400px",
                                    objectFit: "cover",
                                    display: "block", // Removes extra space under image
                                    position: 'absolute',
                                    filter: 'blur(50px)',
                                    zIndex:1,
                                    backgroundColor:'red'
                                }}
                            />
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Uploaded file"
                                style={{
                                    width: "100%",
                                    maxHeight: "400px",
                                    objectFit: "contain",
                                    display: "block", // Removes extra space under image
                                    position: 'relative',
                                    zIndex:2
                                }}
                            />
                        </div>
                    )}
                    <div className="secondary-bg" style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        padding: 5,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex:10
                    }}>
                        <AiOutlineDelete size={20} onClick={cancelFile} />
                    </div>
                </div>

            }
        </div>
    );
}
