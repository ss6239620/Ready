import React, { useState } from 'react'
import '../../asset/css/util.css'
import IconButton from '../buttons/IconButton'
import BigButton from '../buttons/BigButton'
import VideoInput from '../input/VideoInput'
import { HiDotsHorizontal } from "react-icons/hi";
import { darkColorTheme, FILE_URL } from '../../constant';
import { FaRegComment, FaRegEye, FaShare } from "react-icons/fa"
import { BiSolidUpvote, BiUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { makeVote } from '../../services/posts'
import { formatTimeDifference } from '../CommonFunction';
import ImageLightBox from '../../components/Posts/ImageLightBox'
import IconDropDown from '../dropdown/IconDropDown'
import { post_filter_data } from '../../asset/data/dropDownData'
import { IoMdBookmark } from 'react-icons/io'
import SuccessAlert from '../Alert/SuccessAlert'
import FailAlert from '../Alert/FailAlert'
import { useHidePost, useMakeVote, useSavePost } from '../../hooks/postHook'
import { usePostStore } from '../../store/postStore'

export default function PostCard({ style, data, tribeInfo, hoverEfftect, className }) {
  const [imageCLicked, setimageCLicked] = useState(false)
  const navigate = useNavigate();

  function handlePost(tribeid, postid) {
    navigate(`/comment/${tribeid}/${postid}`)
  }

  function handlTribeClick() {
    navigate(`/tribe/${tribeInfo?._id}`)
  }

  const { isError: isSavedError, error: savingError, mutate: mutatePostSave, isSuccess: isSavedData } = useSavePost();

  const { isError: isHideError, error: hidingError, mutate: mutatePostHide, isSuccess: isHiddenData } = useHidePost();

  const { mutate: mutateMakeVote, isSuccess: isMakeVoteData } = useMakeVote();


  const isSavedPost = usePostStore((s) => s.getPostState(data?._id)?.isSaved ?? data?.isSaved);
  const isHidePost = usePostStore((s) => s.getPostState(data?._id)?.isHide ?? data?.isHide);
  const postVote = usePostStore((s) => s.getPostState(data?._id)?.postVote ?? data?.total_vote);
  const isUpVoted = usePostStore((s) => s.getPostState(data?._id)?.isUpVoted ?? data?.isUpVoted);
  const isDownVoted = usePostStore((s) => s.getPostState(data?._id)?.isDownVoted ?? data?.isDownVoted);

  function handlePostMenu(method, post_id, closeDropDown) {
    if (method === "save_post") {
      mutatePostSave({ post_id: post_id });
    }
    if (method === "hide_post") {
      mutatePostHide({ post_id: post_id });
    }
    closeDropDown();
  }

  function handleVote(vote) {
    mutateMakeVote({ post_id: data?._id, vote: vote });
  }

  const getPostMenuLabelAndIcon = (item) => {
    switch (item.method) {
      case "save_post":
        return {
          title: isSavedPost ? "Unsave" : item.title,
          icon: isSavedPost ? IoMdBookmark : item.icon
        };
      // case "follow_post":
      //   return {
      //     title: isFollowing ? "Unfollow Post" : item.title,
      //     icon: item.icon
      //   };
      case "hide_post":
        return {
          title: isHidePost ? "Unhide" : item.title,
         icon: isHidePost ? FaRegEye : item.icon
        };
      default:
        return {
          title: item.title,
          icon: item.icon
        };
    }
  };
  
  const created_time = formatTimeDifference(data?.created_at)

  const hoverEffect = hoverEfftect ? "bright-border-button-hover" : ''

  return (
    <>
      <SuccessAlert isSuccess={isSavedData} title={`Post ${!isSavedPost ? "Removed" : "Saved"} Succesfully`} />
      <SuccessAlert isSuccess={isHiddenData} title={`Post ${!isHidePost ? "Revealed" : "Hidden"} Succesfully`} />
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
          <IconDropDown iconSize={20} Icon={HiDotsHorizontal} childClassName={'w-[200px] right-0 top-[30px] py-[15px] px-5 '} >
            {(closeDropDown =>
              post_filter_data.map((item, index) => {
                const { title, icon } = getPostMenuLabelAndIcon(item);
                return (
                  <div onClick={() => handlePostMenu(item.method, data?._id, closeDropDown)} key={index} className='div-center gap-1 mt-1 cursor-pointer'>
                    <IconButton ror Icon={icon} size={20} />
                    <p>{title}</p>
                  </div>
                )
              })
            )}
          </IconDropDown>
        </div>
        <div>
          <h3 className='large-text-normal-weight cursor-pointer' onClick={() => handlePost(tribeInfo?._id, data?._id)}>{data?.content_title}</h3>
        </div>
        {data?.content_type === 'IMAGE' &&
          <div
            onClick={() => setimageCLicked(true)}
            className='w-[100%] h-[100%] relative border-radius-large overflow-hidden cursor-pointer '>
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
          <p className='medium-text-normal-weight secondary-text cursor-pointer' onClick={() => { handlePost(tribeInfo?._id, data?._id) }} >{data?.content_body}</p>
        }
        <div className='div-center mt-3' >
          <div className='div-center secondary-bg border-radius-large'>
            <IconButton Icon={isUpVoted ? BiSolidUpvote : BiUpvote} size={17} onClick={() => { handleVote(1) }} />
            <h5 className='medium-text-normal-weight'>{postVote}</h5>
            <IconButton Icon={isDownVoted ? BiSolidDownvote : BiDownvote} size={17} onClick={() => { handleVote(0) }} />
          </div>
          <div className='secondary-bg border-radius-large mx-4' >
            <BigButton onClick={() => { handlePost(tribeInfo?._id, data?._id) }} Icon={FaRegComment} iconSize={18} title={`${data?.total_comments}`} />
          </div>
          <div className='secondary-bg border-radius-large' >
            <BigButton Icon={FaShare} iconSize={18 } className={'bg-transparent'} title={`share`} />
          </div>
        </div>
      </div >
    </>
  )
}
