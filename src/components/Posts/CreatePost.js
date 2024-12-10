import React, { useEffect, useState } from "react";
import BrightBorderButtonOnHover from "../../utils/buttons/BrightBorderButtonOnHover";
import Basicinput from "../../utils/input/Basicinput";
import Biginput from "../../utils/input/Biginput";
import BigButton from "../../utils/buttons/BigButton";
import { darkColorTheme, FILE_URL } from "../../constant";
import FileInput from "../../utils/input/FileInput";
import BackGroundDropDown from "../../utils/dropdown/BackGroundDropDown";
import { getAllJoinedTribe } from "../../services/tribe";
import { createPost } from "../../services/posts";
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [postMedia, setPostMedia] = useState(null);
  const [joinedTribe, setJoinedTribe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTribe, setSelectedTribe] = useState(null);
  const [error, setError] = useState(null)
  const [formValues, setformValues] = useState({
    content_title: "",
    content_body: "",
    content_link: ""
  })

  const navigate = useNavigate();

  useEffect(() => {
    getAllJoinedTribe()
      .then((res) => {
        setJoinedTribe(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, []);

  function handleClick(params) {
    const formData = new FormData()
    formData.append('content_title', formValues.content_title);
    formData.append('tribe_posted_to', selectedTribe?._id);

    if (selectedTab === 0) {
      formData.append('content_type', 'TEXT');
      formData.append('content_body', formValues.content_body)      
    }
    if (selectedTab === 1) {
      if (postMedia) {
        const fileType = postMedia.type.split("/")[0]; // "image" or "video"
        if (fileType === "image" || fileType === "video") {
          formData.append("content_type", fileType.toUpperCase());
          formData.append("content", postMedia);
        }
      }
    }
    if (selectedTab === 2) {
      formData.append('content_type', 'LINK');
      formData.append('content_link', formValues.content_link)
    }
    createPost(formData).then(() => {
      navigate('/')
    }).catch((err) => {
      setError(err.response.data.error)
    })
  }

  function handleTabSwitch(tabNum) {
    setSelectedTab(tabNum);
  }

  function TribeSelectionHandler({ closeDropDown }) {
    function handleSelcet(item) {
      setSelectedTribe(item);
      closeDropDown();
    }
    return (
      <div
       
        style={{
          background: darkColorTheme.secondaryColor,
          marginInline: 15,
          overflowY: "auto",
          height: 400,
          borderRadius: 10,
          paddingInline: 10,
          paddingBlock: 20,
          marginTop:20
        }}
      >
        <div>
          <a style={{ fontSize: 13 }}>Your Profile</a>
          <div
            // onClick={() => navigate(`/tribe/${item._id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBlock: 5,
              marginBlock: 5,
            }}
            className="slectDiv"
          >
            <div
              style={{
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={require('../../asset/img/logo.png')}
                alt=""
                style={{
                  width: "90%",
                  height: "90%",
                  objectFit: "cover",
                  borderRadius: "50%", // Optional: makes the image circular
                  display: "block", // Removes extra space under image
                }}
              />
              <a style={{ marginLeft: 10 }}>t/{'username'}</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <a style={{ fontSize: 13 }}>Your Tribes</a>
          {!isLoading && joinedTribe.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelcet(item)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBlock: 5,
                marginBlock: 5,
              }}
              className="slectDiv"
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${FILE_URL}/${item.tribeProfileImage}`}
                  alt=""
                  style={{
                    width: "90%",
                    height: "90%",
                    objectFit: "cover",
                    borderRadius: "50%", // Optional: makes the image circular
                    display: "block", // Removes extra space under image
                  }}
                />
                <a style={{ marginLeft: 10 }}>t/{item.tribeName}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className='main-content' >
      <div style={{ paddingInline: "10%", paddingBlock: "2%", width: "60%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Create Post</h2>
          <BrightBorderButtonOnHover style={{ padding: 13 }} title={"Drafts"} />
        </div>
        <BackGroundDropDown
          style={{ width: "25%",marginBlock:10 }}
          title={"Select a tribe"}
          children={<TribeSelectionHandler />}
          selectedTribe={selectedTribe}
        />
        <div>
          <div style={{ display: "flex" }}>
            <BrightBorderButtonOnHover
              style={{
                padding: 13,
                borderRadius: 0,
                marginInline: 10,
                color: "white",
              }}
              title={"Text"}
              bottomLine={selectedTab === 0 ? true : false}
              onClick={() => handleTabSwitch(0)}
            />
            <BrightBorderButtonOnHover
              style={{ padding: 13, borderRadius: 0, marginInline: 10 }}
              title={"Image & Videos"}
              bottomLine={selectedTab === 1 ? true : false}
              onClick={() => handleTabSwitch(1)}
            />
            <BrightBorderButtonOnHover
              style={{ padding: 13, borderRadius: 0, marginInline: 10 }}
              title={"Link"}
              bottomLine={selectedTab === 2 ? true : false}
              onClick={() => handleTabSwitch(2)}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Basicinput
              setFormValues={setformValues}
              value={formValues.content_title}
              name={'content_title'}
              placeHolder={"Title"}
            />
            {selectedTab === 0 && (
              <Biginput
                setFormValues={setformValues}
                value={formValues.content_body}
                name={'content_body'}
                placeHolder={"Body"}
                style={{ marginBlock: 30, background: "none" }}
              />
            )}
            {selectedTab === 1 && (
              <FileInput
                style={{ marginBlock: 30 }}
                setFile={setPostMedia}
                file={postMedia}
                fileTypes={["image", "video"]}
              />
            )}
            {selectedTab === 2 && (
              <Basicinput
                setFormValues={setformValues}
                value={formValues.content_link}
                name={'content_link'}
                placeHolder={"Link URL"}
                style={{ marginBlock: 30 }}
              />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <BigButton
              title={"Post"}
              style={{
                background: darkColorTheme.accentColor,
                borderRadius: 10,
                paddingInline: 15,
              }}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
