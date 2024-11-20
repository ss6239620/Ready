import React, { useEffect, useState } from "react";
import {
  MdHome,
  MdOutlineGroups,
  MdExplore,
  MdTrendingUp,
  MdKeyboardArrowUp,
  MdOutlineStarOutline,
} from "react-icons/md";
import "../../asset/css/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import BigButton from "../../utils/buttons/BigButton";
import { FaPlus } from "react-icons/fa6";
import CreateTribe from "../Tribe/CreateTribe";
import { getAllJoinedTribe, getAllTribe } from "../../services/tribe";
import { darkColorTheme, FILE_URL } from "../../constant";

const SideBarComponent = [
  {
    title: "Home",
    icon: MdHome,
    path: "home",
  },
  {
    title: "Popular",
    icon: MdTrendingUp,
    path: "home",
  },
  {
    title: "Explore",
    icon: MdExplore,
    path: "explore",
  },
  {
    title: "All",
    icon: MdOutlineGroups,
    path: "home",
  },
  {
    title: "Home",
    icon: MdHome,
    path: "home",
  },
  {
    title: "Popular",
    icon: MdTrendingUp,
    path: "home",
  },
  {
    title: "Explore",
    icon: MdExplore,
    path: "explore",
  },
  {
    title: "All",
    icon: MdOutlineGroups,
    path: "home",
  },
];

export default function Sidebar() {
  const [communityDropDownClicked, setCommunityDropDownClicked] =
    useState(false);
  const [tribeModal, setTribeModal] = useState(false);
  const [allJoinedTribe, setAllJoinedTribe] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  function fetchJoinedTribe(params) {
    getAllJoinedTribe()
      .then((res) => {
        setAllJoinedTribe(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }

  function fetchAllTribe(params) {
    getAllTribe()
    .then((res) => {
      setAllJoinedTribe(res.data.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(true);
    });
  }
  useEffect(() => {
    fetchAllTribe()
  }, []);

  return (
    <div
      className="slectDivContainer main-content"
      style={{
        borderRight: "0.1px solid #FFFFFF19",
        paddingInline: 20,
        paddingBlock: 20,
        overflowY: "auto",
        maxHeight: "100vh",
        position:'fixed',
        background:'#101010',
        top:0,
        left:0,
        width:240
      }}
    >
      <CreateTribe isOpen={tribeModal} setModal={setTribeModal} />
      <div style={{}}>
        {SideBarComponent.map((item, i) => (
          <div
            className="slectDiv"
            onClick={()=>navigate(`/${item.path}`)}
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <item.icon size={25} />
            <div style={{ marginInline: 15 }}>
              <a >
                {item.title}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div style={{}}>
        <div style={{ border: "0.1px solid #FFFFFF19", marginBlock: 10 }}></div>
        <div
          onClick={() =>
            communityDropDownClicked
              ? setCommunityDropDownClicked(false)
              : setCommunityDropDownClicked(true)
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="slectDiv"
        >
          <div>
            <a>Tribes</a>
          </div>
          <MdKeyboardArrowUp size={25} />
        </div>
        <div
          onClick={() => setTribeModal(true)}
          className="slectDiv"
          style={{ padding: 5, marginBottom: 10 }}
        >
          <BigButton
            Icon={FaPlus}
            title={"Create a tribe"}
            style={{ padding: 5, background: "transparent" }}
          />
        </div>
        <div style={{ display: communityDropDownClicked ? "none" : "block" }}>
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <div className="loader">Loading...</div>{" "}
              {/* You can replace with a spinner component or icon */}
            </div>
          )}
          {!isLoading &&
            allJoinedTribe.map((item, index) => (
              <div
              onClick={()=>navigate(`/tribe/${item._id}`)}
                key={index}
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
                <div>
                  <MdOutlineStarOutline size={20} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
