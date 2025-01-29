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

export default function PostCard({ style, data, tribeInfo, hoverEfftect,className }) {
  const [imageCLicked, setimageCLicked] = useState(false)
  const navigate = useNavigate();

  function handlePost(tribeid, postid) {    
    navigate(`/comment/${tribeid}/${postid}`)
  }

  function handlTribeClick() {
    navigate(`/tribe/${tribeInfo?._id}`)
}

  function handleVote(vote) {
    makeVote(data?._id, vote).then(res => {
      console.log(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const created_time = formatTimeDifference(data?.created_at)

  const hoverEffect = hoverEfftect ? "bright-border-button-hover" : ''

  return (
    <>
      <ImageLightBox isOpen={imageCLicked} setModal={setimageCLicked} source={`${FILE_URL}/${data?.content_path}`} />
      <div className={`${hoverEffect} ${className} rounded-xl px-4 py-1`} style={{ ...style }}>
        <div className='div-center-justify'>
          <div className='div-center-justify-center gap-2'>
              <img
                src={`${FILE_URL}/${tribeInfo?.tribeProfileImage}`}
                alt=""
                className='img-small-style'
              />
            <h5 className='medium-text-normal-weight cursor-pointer' onClick={handlTribeClick}>t/{tribeInfo?.tribeName}</h5>
            <a className='small-text-normal-weight'>{created_time} ago</a>
          </div>
          <IconButton Icon={HiDotsHorizontal} size={20} />
        </div>
        <div>
          <h3 className='large-text-normal-weight cursor-pointer' onClick={()=>handlePost(tribeInfo?._id, data?._id)}>{data?.content_title}</h3>
        </div>
        {data?.content_type === 'IMAGE' &&
          <div
            onClick={() => setimageCLicked(true)}
            className= 'w-[100%] h-[100%] relative border-radius-large overflow-hidden cursor-pointer '>
            <img
              src={`${FILE_URL}/${data?.content_path}`}
              className='w-[100%] object-cover block absolute blur-[200px] z-[1] bg-[var(--teritory)] '
            />
            <img
              src={`${FILE_URL}/${data?.content_path}`}
              className='w-[100%] max-h-[500px] object-contain block relative z-[2] '
            />
          </div>
        }
        {data?.content_type === 'VIDEO' &&
          <div
          className='flex h-[450px] my-3 cursor-pointer'
          >
            <VideoInput contentPath={`${FILE_URL}/${data?.content_path}`} />
          </div>
        }
        {data?.content_type === 'TEXT' &&
          <p className='medium-text-normal-weight secondary-text cursor-pointer' onClick={() => {handlePost(tribeInfo?._id, data?._id)}} >{data?.content_body}</p>
        }
        <div className='div-center mt-3' >
          <div className='div-center secondary-bg border-radius-large'>
            <IconButton Icon={BiUpvote} size={17} onClick={() => { handleVote(1) }} />
            <h5 className='medium-text-normal-weight'>{data?.total_vote}</h5>
            <IconButton Icon={BiUpvote} size={17} onClick={() => { handleVote(0) }} />
          </div>
          <div className='secondary-bg border-radius-large mx-4' >
            <BigButton onClick={() => {handlePost(tribeInfo?._id, data?._id)}} Icon={FaRegComment} iconSize={20} title={`1`} />
          </div>
          <div className='secondary-bg border-radius-large' >
            <BigButton Icon={FaShare} iconSize={20} className={'bg-transparent'}  title={`share`} />
          </div>
        </div>
      </div >
    </>
  )
}
