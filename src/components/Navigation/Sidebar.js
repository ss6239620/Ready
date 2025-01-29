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
import {truncateText} from '../../utils/CommonFunction'

const SideBarComponent = [
  {
    title: "Home",
    icon: MdHome,
    path: "home",
  },
  {
    title: "Popular",
    icon: MdTrendingUp,
    path: "popular",
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
      className="slectDivContainer main-content primaery-bg divider-right fixed-component p-5 top-[5px] max-h-[calc(100vh-65px)] left-0 w-[280px] "
    >
      <CreateTribe isOpen={tribeModal} setModal={setTribeModal} />
      <div
        className="pb-5"
      >
        {SideBarComponent.map((item, i) => (
          <div
            key={i}
            className="slectDiv div-center self-center"
            onClick={() => navigate(`/${item.path}`)}
          >
            <item.icon size={25} />
            <div className="mx-4" >
              <a className="medium-text-normal-weight" >
                {item.title}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="divider-bottom my-3"></div>
        <div
          onClick={() =>
            communityDropDownClicked
              ? setCommunityDropDownClicked(false)
              : setCommunityDropDownClicked(true)
          }
          className="slectDiv div-center-justify"
        >
          <div>
            <a className="large-text-normal-weight" >Tribes</a>
          </div>
          <MdKeyboardArrowUp size={25} />
        </div>
        <div
          onClick={() => setTribeModal(true)}
          className="slectDiv p-[5px] mb-2"
        >
          <BigButton
            Icon={FaPlus}
            className={'p-[5px!important] bg-[transparent]'}
            title={"Create a tribe"}
          />
        </div>
        <div className={`${communityDropDownClicked?'hidden':'block'}`} >
          {isLoading && (
            <div
            className="flex justify-center p-[5px!important]"
            >
              <div className="loader">Loading...</div>{" "}
              {/* You can replace with a spinner component or icon */}
            </div>
          )}
          {!isLoading &&
            allJoinedTribe.map((item, index) => (
              <div
                onClick={() => navigate(`/tribe/${item._id}`)}
                key={index}
                className="slectDiv div-center-justify p-[9px!important] m-1"
              >
                <div
                  className="div-center gap-2"
                >
                  <img
                    src={`${FILE_URL}/${item?.tribeProfileImage}`}
                    alt=""
                    className="img-small-style"
                  />
                  <a className="medium-text-normal-weight">t/{truncateText(item?.tribeName,12)}</a>
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
