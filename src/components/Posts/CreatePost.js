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
import { useNavigate, useSearchParams } from 'react-router-dom'

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

  const [searchParams] = useSearchParams()
  const tribe_id = searchParams.get('id');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Submit to Tribe`
    getAllJoinedTribe()
      .then((res) => {
        setJoinedTribe(res.data.data);

        if (tribe_id) {
          const matchingTribe = res.data.data.find((tribe) => tribe._id === tribe_id);
          if (matchingTribe) {
            setSelectedTribe(matchingTribe);
          }
        }
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
        className="secondary-bg mx-[15px] overflow-y-auto h-[400px] rounded-xl px-[10px] py-5 mt-[5px] "
      >
        <div>
          <a className="large-text-small-weight">Your Profile</a>
          <div
            // onClick={() => navigate(`/tribe/${item._id}`)}
            className="slectDiv div-center-justify py-1 my-1"
          >
            <div
              className="div-center"
            >
              <img
                src={require('../../asset/img/logo.png')}
                alt=""
                className="img-small-style"
              />
              <a className="medium-text-small-weight">t/{'username'}</a>
            </div>
          </div>
        </div>
        <div className="mt-5" >
          <a className="large-text-small-weight">Your Tribes</a>
          {!isLoading && joinedTribe.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelcet(item)}
              className="slectDiv div-center-justify py-1 my-1"
            >
              <div
                className="div-center"
              >
                <img
                  src={`${FILE_URL}/${item?.tribeProfileImage}`}
                  alt=""
                  className="img-small-style"
                />
                <a className="medium-text-small-weight">t/{item?.tribeName}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className='main-content' >
      <div className="px-[10%] py-[2%] w-[80%] " >
        <div
          className="div-center-justify"
        >
          <h2 className="large-text-normal-weight">Create Post</h2>
          <BrightBorderButtonOnHover className={'p-3'} title={"Drafts"} />
        </div>
        <BackGroundDropDown
          className={'w-[25%] my-3'}
          title={"Select a tribe"}
          children={<TribeSelectionHandler />}
          selectedTribe={selectedTribe}
        />
        <div>
          <div className="flex" >
            <BrightBorderButtonOnHover
              className={'p-3 rounded-[0px!important] mx-3'}
              title={"Text"}
              bottomLine={selectedTab === 0 ? true : false}
              onClick={() => handleTabSwitch(0)}
            />
            <BrightBorderButtonOnHover
              className={'p-3 rounded-[0px!important] mx-3'}
              title={"Image & Videos"}
              bottomLine={selectedTab === 1 ? true : false}
              onClick={() => handleTabSwitch(1)}
            />
            <BrightBorderButtonOnHover
              className={'p-3 rounded-[0px!important] mx-3'}
              title={"Link"}
              bottomLine={selectedTab === 2 ? true : false}
              onClick={() => handleTabSwitch(2)}
            />
          </div>
          <div className="mt-5" >
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
                className={'my-7 bg-[transparent!important]'}
              />
            )}
            {selectedTab === 1 && (
              <FileInput
                className={'my-7'}
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
                className={'my-7'}
              />
            )}
          </div>
          <div className="flex justify-end">
            <BigButton
              className={'accent-bg text-[#fff] rounded-2xl px-5'}
              title={"Post"}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
