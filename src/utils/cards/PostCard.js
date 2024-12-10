import React, { useState } from 'react'
import '../../asset/css/util.css'
import IconButton from '../buttons/IconButton'
import BigButton from '../buttons/BigButton'
import VideoInput from '../input/VideoInput'
import { HiDotsHorizontal } from "react-icons/hi";
import { darkColorTheme, FILE_URL } from '../../constant';
import { FaRegComment, FaShare } from "react-icons/fa"
import { BiSolidUpvote, BiUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { makeVote } from '../../services/posts'
import { formatTimeDifference } from '../CommonFunction';
import ImageLightBox from '../../components/Posts/ImageLightBox'

export default function PostCard({ style, data, tribeInfo, hoverEfftect }) {
  const [imageCLicked, setimageCLicked] = useState(false)
  const navigate = useNavigate();

  function handlePost(tribeid, postid) {    
    navigate(`/comment/${tribeid}/${postid}`)
  }

  function handlTribeClick() {
    navigate(`/tribe/${tribeInfo._id}`)
}

  function handleVote(vote) {
    makeVote(data._id, vote).then(res => {
      console.log(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const created_time = formatTimeDifference(data.created_at)

  const hoverEffect = hoverEfftect ? "bright-border-button-hover" : ''

  return (
    <>
      <ImageLightBox isOpen={imageCLicked} setModal={setimageCLicked} source={`${FILE_URL}/${data.content_path}`} />
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
                src={`${FILE_URL}/${tribeInfo.tribeProfileImage}`}
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
            <h5 onClick={handlTribeClick} style={{ marginInline: 3, marginBlock: 0,cursor:'pointer' }}>t/{tribeInfo.tribeName}</h5>
            <div style={{ background: darkColorTheme.secondaryTextColor, padding: 3, borderRadius: 20, marginInline: 3 }} />
            <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 13 }}>{created_time} ago</a>
          </div>
          <IconButton Icon={HiDotsHorizontal} size={20} />
        </div>
        <div>
          <h3 onClick={()=>handlePost(tribeInfo._id, data._id)} style={{ marginBlock: 5, marginBottom: 15,cursor:'pointer' }}>{data.content_title}</h3>
        </div>
        {data.content_type === 'IMAGE' &&
          <div
            onClick={() => setimageCLicked(true)}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              borderRadius: 30,
              overflow: 'hidden',
              cursor: 'pointer'
            }}>
            <img
              src={`${FILE_URL}/${data.content_path}`}
              style={{
                width: "100%",
                objectFit: "cover",
                display: "block", // Removes extra space under image
                position: 'absolute',
                filter: 'blur(200px)',
                zIndex: 1,
                backgroundColor: 'red'
              }}
            />
            <img
              src={`${FILE_URL}/${data.content_path}`}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                display: "block", // Removes extra space under image
                position: 'relative',
                zIndex: 2
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
          <p onClick={() => {handlePost(tribeInfo._id, data._id)}}  style={{cursor:'pointer'}}>{data.content_body}</p>
        }
        <div className='div-center' style={{}}>
          <div className='div-center' style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
            <IconButton Icon={BiUpvote} size={17} onClick={() => { handleVote(1) }} />
            <h5 style={{ marginInline: 5, marginBlock: 0 }}>{data.total_vote}</h5>
            <IconButton Icon={BiUpvote} size={17} onClick={() => { handleVote(0) }} />
          </div>
          <div style={{ background: '#3c3c3cb0', borderRadius: 30, marginInline: 15 }}>
            <BigButton onClick={() => {handlePost(tribeInfo._id, data._id)}} Icon={FaRegComment} iconSize={20} style={{ background: 'none' }} title={`1`} />
          </div>
          <div style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
            <BigButton Icon={FaShare} iconSize={20} style={{ background: 'none' }} title={`share`} />
          </div>
        </div>
      </div >
    </>
  )
}
