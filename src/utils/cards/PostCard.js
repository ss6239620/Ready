import React from 'react'
import '../../asset/css/util.css'
import IconButton from '../buttons/IconButton'
import BigButton from '../buttons/BigButton'
import VideoInput from '../input/VideoInput'
import { HiDotsHorizontal } from "react-icons/hi";
import { darkColorTheme, FILE_URL } from '../../constant';
import { FaRegComment, FaShare } from "react-icons/fa"
import { BiSolidUpvote, BiUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'

export default function PostCard({ style, data, tribeIndo, hoverEfftect }) {
  const navigate = useNavigate()
  function handleComment(tribeid, postid) {
    navigate(`/comment/${tribeid}/${postid}`)
  }

  const hoverEffect = hoverEfftect ? "bright-border-button-hover" : ''
  return (
    <>
      <div className={hoverEffect} style={{ borderRadius: 10, paddingInline: 15, paddingBlock: 5, ...style }}>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={`${FILE_URL}/${tribeIndo.tribeProfileImage}`}
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
            <h5 style={{ marginInline: 3, marginBlock: 0 }}>t/{tribeIndo.tribeName}</h5>
            <div style={{ background: darkColorTheme.secondaryTextColor, padding: 3, borderRadius: 20, marginInline: 3 }} />
            <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 13 }}>3 hr ago</a>
          </div>
          <IconButton Icon={HiDotsHorizontal} size={20} />
        </div>
        <div>
          <h3 style={{ marginBlock: 5 }}>{data.content_title}</h3>
        </div>
        {data.content_type === 'IMAGE' &&
          <div
            style={{
              display: "flex",
              height: 450,
              marginBlock: 10,
              cursor: 'pointer'
            }}
          >
            <img
              src={`${FILE_URL}/${data.content_path}`}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
          </div>
        }
        {data.content_type === 'VIDEO' &&
          <div
            style={{
              display: "flex",
              height: 450,
              marginBlock: 10,
              cursor: 'pointer'
            }}
          >
            <VideoInput contentPath={`${FILE_URL}/${data.content_path}`} />
          </div>
        }
        {data.content_type === 'TEXT' &&
          <p>{data.content_body}</p>
        }
        <div className='div-center' style={{}}>
          <div className='div-center' style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
            <IconButton Icon={BiUpvote} size={17} />
            <h5 style={{ marginInline: 5, marginBlock: 0 }}>55</h5>
            <IconButton Icon={BiUpvote} size={17} />
          </div>
          <div style={{ background: '#3c3c3cb0', borderRadius: 30, marginInline: 15 }}>
            <BigButton onClick={() => handleComment(tribeIndo._id, data._id)} Icon={FaRegComment} iconSize={20} style={{ background: 'none' }} title={`1`} />
          </div>
          <div style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
            <BigButton Icon={FaShare} iconSize={20} style={{ background: 'none' }} title={`share`} />
          </div>
        </div>
      </div >
    </>
  )
}
