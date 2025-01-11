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
        style={{ marginBlock: 20 }}
      />
      <div className={hoverEffect_style} style={{ marginBlock: 10, padding: hoverEffect ? 20 : 0, ...style }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${FILE_URL}/${data.posted_tribe_id.tribeProfileImage}`}
                  alt=""
                  style={{
                    width: "90%",
                    height: "90%",
                    objectFit: "cover",
                    borderRadius: "50%", // Optional: makes the image circular
                    display: "block", // Removes extra space under image
                  }}
                />
              </div>
              <h5
                onClick={handlTribeClick}
                className="text-underline"
                style={{
                  marginInline: 3,
                  marginBlock: 0,
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                t/{data.posted_tribe_id.tribeName}
              </h5>
            </div>
            <h4
              onClick={handlPostClick}
              // className='text-underline'
              style={{
                marginInline: 3,
                marginBlock: 5,
                fontSize: not_require ? 18 : 15,
                fontWeight: "bold",
                cursor: 'pointer'
              }}
            >
              {truncateText(
                data.content_title,
                no_of_charactor ? no_of_charactor : 60
              )}
            </h4>
          </div>
          <div
            style={{
              width: "90px",
              height: "90px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {data.content_type === "IMAGE" && (
              <img
                src={`${FILE_URL}/${data.content_path}`}
                alt=""
                style={{
                  width: "90%",
                  height: "90%",
                  objectFit: "cover",
                  borderRadius: 10,
                  display: "block", // Removes extra space under image
                }}
              />
            )}
          </div>
        </div>
        <div className="div-center" style={{}}>
          <h5
            style={{
              marginInline: 3,
              marginBlock: 0,
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            1.1k <span>upvotes</span>
          </h5>
          <div
            className="secondary-text"
            style={{
              padding: 1,
              borderRadius: 20,
              marginInline: 3,
            }}
          />
          <h5
            style={{
              marginInline: 3,
              marginBlock: 0,
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            225 <span>comments</span>
          </h5>
        </div>
      </div>
    </>
  );
}
