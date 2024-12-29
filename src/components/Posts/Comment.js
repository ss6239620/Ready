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
      style={{
        border: "1px solid #666",
        borderRadius: 30,
        paddingInline: 15,
        paddingBlock: 10,
        marginBlock: 10,
        position: 'relative',
        marginLeft: 37,
        ...style
      }}
    >
      {gifClicked &&
        <div style={{ position: 'absolute', top: 120, zIndex: 1 }}>
          <GifInput />
        </div>
      }
      {emojiClicked &&
        <div style={{ position: 'absolute', top: 120, zIndex: 1 }}>
          <EmojiInput
            replyComment={replyComment}
            setReplyComment={setReplyComment}
          />
        </div>
      }
      {textEditorClicked ?
        <div style={{}}>
          <RichTextEditor />
        </div>
        :
        <Biginput
          value={replyComment.replyToCommentText}
          setFormValues={setReplyComment}
          name="replyToCommentText"
          style={{ background: "none", border: "none", padding: 0 }}
          minHeight={18}
        />
      }
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="div-center" style={{ gap: 10 }}>
          <IconButton onClick={() => setGifClicked(prev => !prev)} Icon={HiOutlineGif} size={20} style={{}} />
          <IconButton onClick={() => setEmojiClicked(prev => !prev)} Icon={BsEmojiSmile} size={20} style={{}} />
          <div onClick={() => setTextEditorClicked(prev => !prev)} className='icon-button-hover' style={{ cursor: 'pointer', paddingBlock: 8, paddingInline: 14, display: 'flex', justifyContent: 'center', borderRadius: 30, }}>
            <a>T</a>
          </div>
        </div>
        <div className="div-center" style={{}}>
          <BigButton
            onClick={handleCLose}
            title={"cancel"}
            style={{ marginRight: 10, background: "#666", }}
            labelStyle={{ fontSize: 13 }}
          />
          <BigButton
            title={"comment"}
            style={{ background: darkColorTheme.secondaryTextColor }}
            onClick={() => ReplyToComment(comment_id)}
            labelStyle={{ fontSize: 13 }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Comment() {
  const [postData, setPostData] = useState({});
  const [addComment, setAddComment] = useState({
    commentText: "",
    replyToCommentText: ''
  });
  const [showComment, setShowComment] = useState(false)
  const [loading, setIsLoading] = useState(true);
  const [tribeDetail, setTribeDetail] = useState([]);
  const [replyVisible, setReplyVisible] = useState(null);
  const [allCommentdata, setAllCommentdata] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { tribeid, postid } = useParams();
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

  function fetchpostData(params) {
    getPost(postid)
      .then((res) => {
        setPostData(res.data.data);
        document.title = `${res.data.data.content_title}`
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchTribeDetail(params) {
    getTribeDetails(tribeid)
      .then((res) => {
        setTribeDetail(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }

  useEffect(() => {
    fetchpostData();
    fetchTribeDetail();
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



  function renderComments(comments, depth = 0, maxDepth = 3, marginLeft = 0) {
    if (depth > maxDepth) return (
      <div>
        <p style={{ fontSize: 14, color: darkColorTheme.secondaryTextColor, marginBlock: 0 }}>{comments.length} more replies</p>
      </div>
    );
    return comments.map((comment) => (
      <div key={comment._id} style={{ marginLeft: marginLeft + "px", marginTop: 5, position: 'relative', }}>
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
      {!loading ? (
        <div
          className="main-content"
          style={{
            padding: "10px 90px 10px 40px",
            paddingBlock: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <IconButton Icon={IoIosArrowRoundBack} onClick={() => navigate(-1)} />
          </div>

          <div style={{ flex: "1", paddingInline: 15, paddingBlock: 2 }} >
            <PostCard
              data={postData}
              tribeInfo={tribeDetail}
              style={{ paddingInline: 0, paddingBlock: 0, marginBottom: 10 }}
            />


            <div
              style={{
                border: "1px solid #666",
                borderRadius: 30,
                padding: 8,
              }}
            >
              <div onClick={() => setShowComment(true)}>
                <Biginput
                  value={addComment.commentText}
                  setFormValues={setAddComment}
                  name="commentText"
                  placeHolder={"Add a comment"}
                  style={{ border: 0, padding: 0, background: 'none' }}
                  minHeight={2}
                />
              </div >
              {showComment &&
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>T</div>
                  <div className="div-center" style={{ paddingBlock: 10 }}>
                    <BigButton
                      onClick={() => setShowComment(false)}
                      title={"cancel"}
                      style={{ marginRight: 10, background: "#666" }}
                    />
                    <BigButton
                      title={"comment"}
                      style={{ background: darkColorTheme.secondaryTextColor }}
                      onClick={AddComment}
                    />
                  </div>
                </div>
              }
            </div>


            <div style={{ marginBlock: 30 }}>

              <InfiniteScroll fetchData={fetchAllPostCommentData} hasMoreData={hasMore}>
                {renderComments(allCommentdata, 0, 3, 0)}
              </InfiniteScroll>
              {!hasMore && <div>No More Comments To Show</div>}
            </div>
          </div>
          <div style={{ position: 'sticky', top: 70, left: 0, alignSelf: 'flex-start', width: '25%' }}>
            <TribeSideInfo tribeDetail={tribeDetail} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
