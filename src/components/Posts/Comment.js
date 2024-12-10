import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../services/posts";
import PostCard from "../../utils/cards/PostCard";
import { getTribeDetails } from "../../services/tribe";
import TribeSideInfo from "../Tribe/TribeSideInfo";
import IconButton from "../../utils/buttons/IconButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import Basicinput from "../../utils/input/Basicinput";
import Biginput from "../../utils/input/Biginput";
import { darkColorTheme } from "../../constant";
import CommentCard from "../../utils/cards/CommentCard";
import BigButton from "../../utils/buttons/BigButton";
import { getAllPostComment, postComment, replyToComment } from "../../services/comment";


function ReplyInput({ comment_id,handleCLose }) {
  const [replyComment, setReplyComment] = useState({
    replyToCommentText: ''
  });

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
        padding: 15,
        marginBlock: 10,
      }}
    >
      <Biginput
        value={replyComment.replyToCommentText}
        setFormValues={setReplyComment}
        name="replyToCommentText"
        style={{ background: "none", border: "none", padding: 0 }}
        minHeight={20}
      />
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
            onClick={handleCLose}
            title={"cancel"}
            style={{ marginRight: 10, background: "#666" }}
          />
          <BigButton
            title={"comment"}
            style={{ background: darkColorTheme.secondaryTextColor }}
            onClick={() => ReplyToComment(comment_id)}
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

  const { tribeid, postid } = useParams();

  function fetchAllPostCommentData(params) {
    getAllPostComment(postid)
      .then((res) => {
        console.log(res.data.data);
        setAllCommentdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchpostData(params) {
    getPost(postid)
      .then((res) => {
        setPostData(res.data.data);
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
    fetchAllPostCommentData();
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



  function renderComments(comments, depth = 0) {
    return comments.map((comment) => (
      <div key={comment._id} style={{ marginLeft: depth + "px", marginTop: 5 }}>
        <CommentCard
          commentText={comment.comment_text}
          created_at={comment.created_at}
          total_comment_vote={comment.total_comment_vote}
          creatorName={
            depth === 0
              ? comment.creator.username
              : comment.reply_creator.username
          } // Assuming this is the user's ID, adjust accordingly
          onReplyClick={() => setReplyVisible(comment._id)}
        />
        {replyVisible === comment._id && <ReplyInput comment_id={comment._id} handleCLose={handleCLose} />}
        {comment.replies && comment.replies.length > 0 && (
          <div>{renderComments(comment.replies, depth + 20)}</div>
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
            <IconButton Icon={IoIosArrowRoundBack} />
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
                padding: 15,
              }}
            >
              <div onClick={() => setShowComment(true)}>
                <Biginput
                  value={addComment.commentText}
                  setFormValues={setAddComment}
                  name="commentText"
                  placeHolder={"Add a comment"}
                  style={{ border: 0, padding: 0, background: 'none' }}
                  minHeight={10}
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
              {allCommentdata.length === 0 ? (
                <p>No comments available.</p>
              ) : (
                renderComments(allCommentdata) // Render the top-level comments
              )}
            </div>
          </div>
          <div style={{ flex: "0.4", marginLeft: 15 }}>
            <TribeSideInfo tribeDetail={tribeDetail} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
