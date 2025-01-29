import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../services/posts";
import PostCard from "../../utils/cards/PostCard";
import { getTribeDetails } from "../../services/tribe";
import TribeSideInfo from "../Tribe/TribeSideInfo";
import IconButton from "../../utils/buttons/IconButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import GifInput from "../../utils/input/GifInput";
import Biginput from "../../utils/input/Biginput";
import { darkColorTheme } from "../../constant";
import CommentCard from "../../utils/cards/CommentCard";
import BigButton from "../../utils/buttons/BigButton";
import { getAllPostComment, postComment, replyToComment } from "../../services/comment";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiInput from "../../utils/input/EmojiInput";
import RichTextEditor from "../../utils/RichTextEditor";
import InfiniteScroll from "../../utils/InfiniteScroll";
import { usePostData, useTribeDetails } from "../../hooks/postHook";
import ErrorAlert from "../../utils/Alert/ErrorAlert";


function ReplyInput({ comment_id, handleCLose, style }) {
  const [replyComment, setReplyComment] = useState({
    replyToCommentText: ''
  });

  const [gifClicked, setGifClicked] = useState(false);
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [textEditorClicked, setTextEditorClicked] = useState(false);

  function ReplyToComment(comment_id) {
    replyToComment(replyComment.replyToCommentText, comment_id).then((res) => {
      console.log('Cmment Added');
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div
      className="border rounded-[30px] px-[15px] py-[10px] my-[10px] relative ml-[37px]"
      style={{
        ...style
      }}
    >
      {gifClicked &&
        <div className="absolute top-[120px] z-[1]">
          <GifInput />
        </div>
      }
      {emojiClicked &&
        <div className="absolute top-[120px] z-[1]" >
          <EmojiInput
            replyComment={replyComment}
            setReplyComment={setReplyComment}
          />
        </div>
      }
      {textEditorClicked ?
        <div >
          <RichTextEditor />
        </div>
        :
        <Biginput
          value={replyComment.replyToCommentText}
          setFormValues={setReplyComment}
          name="replyToCommentText"
          className={'bg-[transparent!important] border-none p-[0px!important] '}
          minHeight={18}
        />
      }
      <div
        className="div-center-justify"
      >
        <div className="div-center gap-[8px]" >
          <IconButton onClick={() => setGifClicked(prev => !prev)} Icon={HiOutlineGif} size={20} />
          <IconButton onClick={() => setEmojiClicked(prev => !prev)} Icon={BsEmojiSmile} size={20} />
          <div onClick={() => setTextEditorClicked(prev => !prev)} className='icon-button-hover cursor-pointer py-2 px-3 div-center rounded-[30px] '>
            <a>T</a>
          </div>
        </div>
        <div className="div-center" >
          <BigButton
            className={'secondary-bg mr-3'}
            onClick={handleCLose}
            title={"cancel"}
            labelStyle={{ fontSize: 13 }}
          />
          <BigButton
            className={'accent-bg text-[#fff]'}
            title={"comment"}
            onClick={() => ReplyToComment(comment_id)}
            labelStyle={{ fontSize: 13 }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Comment() {
  const [addComment, setAddComment] = useState({
    commentText: "",
    replyToCommentText: ''
  });
  const [showComment, setShowComment] = useState(false)
  const [replyVisible, setReplyVisible] = useState(null);
  const [allCommentdata, setAllCommentdata] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { tribeid, postid } = useParams();

  const { data: postData, isLoading: postLoading, isError: isPostError } = usePostData(postid);
  const { data: tribeDetail, isLoading: tribeLoading, isError: isTribeError } = useTribeDetails(tribeid);

  const navigate = useNavigate();

  const fetchAllPostCommentData = useCallback((page) => {
    console.log('fetched....', page);
    getAllPostComment(postid, page)
      .then((res) => {
        setAllCommentdata((prevData) => [...prevData, ...res.data.data]);
        setHasMore(res.data.data.length > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCLose() {
    setReplyVisible(null);
  }

  function AddComment(params) {
    postComment(addComment.commentText, postid).then((res) => {
      console.log('Cmment Added');
    }).catch((err) => {
      console.log(err);
    })
  }


  if (postLoading || tribeLoading) {
    return <div className="main-content p-[10px_90px_10px_40px] flex justify-between py-3 ">Loading...</div>;
  }
  if (isTribeError || isPostError) {
    return <ErrorAlert className={'py-6 px-5'} />
  }


  if (!postData || !tribeDetail) {
    return <div>No data available</div>;
  }


  function renderComments(comments, depth = 0, maxDepth = 3, marginLeft = 0) {
    if (depth > maxDepth) return (
      <div>
        <p className="medium-text-normal-weight secondary-text" >{comments.length} more replies</p>
      </div>
    );
    return comments.map((comment) => (
      <div key={comment._id} className={`ml-[${marginLeft}px] mt-1 relative `} >
        <CommentCard
          commentText={comment.comment_text}
          created_at={comment.created_at}
          total_comment_vote={comment.total_comment_vote}
          creatorName={comment?.created_by?.username}
          onReplyClick={() => setReplyVisible(comment._id)}
          profile={comment?.created_by?.profile_avtar}
          depth={depth}
          childCount={comment.child_comment_ids.length}
        />
        {replyVisible === comment._id && <ReplyInput comment_id={comment._id} handleCLose={handleCLose} />}
        {comment.child_comment_ids && comment.child_comment_ids.length > 0 && (
          <div>{renderComments(comment.child_comment_ids, depth + 1, maxDepth, 37)}</div>
        )}
      </div>
    ));
  }

  return (
    <div>
      <div
        className="main-content p-[10px_90px_10px_40px] flex justify-between py-3 "
      >
        <div>
          <IconButton Icon={IoIosArrowRoundBack} onClick={() => navigate(-1)} />
        </div>

        <div className="flex-1 px-4 py-1"  >
          <PostCard
            data={postData}
            tribeInfo={tribeDetail}
            className={'py-[0px!important] px-[0px!important] mb-2'}
          />


          <div
            className="border rounded-[20px] p-2"
          >
            <div onClick={() => setShowComment(true)}>
              <Biginput
                value={addComment.commentText}
                setFormValues={setAddComment}
                name="commentText"
                placeHolder={"Add a comment"}
                className={'bg-[transparent!important] p-[0px!important] border-none'}
                minHeight={2}
              />
            </div >
            {showComment &&
              <div
                className="div-center-justify"
              >
                <div>T</div>
                <div className="div-center py-2" >
                  <BigButton
                    className={'secondary-bg mr-3 small-text-normal-weight'}
                    onClick={() => setShowComment(false)}
                    title={"cancel"}
                  />
                  <BigButton
                    className={'accent-bg text-[#fff] small-text-normal-weight'}
                    title={"comment"}
                    onClick={AddComment}
                  />
                </div>
              </div>
            }
          </div>


          <div className="my-8" >
            <InfiniteScroll fetchData={fetchAllPostCommentData} hasMoreData={hasMore}>
              {renderComments(allCommentdata, 0, 3, 0)}
            </InfiniteScroll>
            {!hasMore && <div>No More Comments To Show</div>}
          </div>
        </div>
        <div className="sticky top-16 left-0 self-start w-[25%]" >
          <TribeSideInfo tribeDetail={tribeDetail} />
        </div>
      </div>
    </div>
  );
}
