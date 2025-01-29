import React from "react";
import Underline from "../Underline";
import { darkColorTheme, FILE_URL } from "../../constant";
import { truncateText } from "../CommonFunction";
import { useNavigate } from "react-router-dom";
import '../../asset/css/util.css'

export default function PostSummaryCard({
  style,
  data,
  no_of_charactor,
  onClick,
  hoverEffect,
  not_require
}) {
  const navigate = useNavigate();

  function handlPostClick() {
    navigate(`/comment/${data.posted_tribe_id._id}/${data._id}`);
    if (onClick) {
      onClick();
    }
  }

  function handlTribeClick() {
    navigate(`/tribe/${data.posted_tribe_id._id}`);
    if (onClick) {
      onClick();
    }
  }

  const hoverEffect_style = hoverEffect ? "bright-border-button-hover" : '';

  return (
    <>
      <Underline
        color={darkColorTheme.divider}
        sizeInPx={0.3}
        className={'my-5'}
      />
      <div className={`${hoverEffect_style} my-3 ${hoverEffect ? 'p-5' : 'p-0'} `} style={{  ...style }}>
        <div className="div-justify" >
          <div className="flex-1" >
            <div className="div-center gap-1" >
              <img
                src={`${FILE_URL}/${data.posted_tribe_id.tribeProfileImage}`}
                alt=""
                className="img-small-style"
              />
              <h5
                onClick={handlTribeClick}
                className="text-underline medium-text-large-weight"
              >
                t/{truncateText(data.posted_tribe_id.tribeName, 12)}
              </h5>
            </div>
            <h4
              onClick={handlPostClick}
              className={`${not_require ? 'large-text-normal-weight' : 'medium-text-normal-weight'} cursor-pointer`}
            >
              {truncateText(
                data.content_title,
                no_of_charactor ? no_of_charactor : 60
              )}
            </h4>
          </div>
          {data.content_type === "IMAGE" && (
            <img
              src={`${FILE_URL}/${data.content_path}`}
              alt=""
              className="img-small-style w-[90px!important] h-[90px!important] rounded-[10px!important] "
            />
          )}
        </div>
        <div className="div-center" >
          <h5
            className="small-text-normal-weight"
          >
            1.1k <span className="small-text-small-weight">upvotes</span>
          </h5>
          <div
            className="secondary-text p-[1px] rounded-2xl mx-1 "
          />
          <h5
            className="small-text-normal-weight"
          >
            225 <span className="small-text-small-weight">comments</span>
          </h5>
        </div>
      </div>
    </>
  );
}
