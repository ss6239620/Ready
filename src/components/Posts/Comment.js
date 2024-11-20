import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '../../services/posts';
import PostCard from '../../utils/cards/PostCard';
import { getTribeDetails } from '../../services/tribe';
import TribeSideInfo from '../Tribe/TribeSideInfo';
import IconButton from '../../utils/buttons/IconButton';
import { IoIosArrowRoundBack } from "react-icons/io";
import Basicinput from '../../utils/input/Basicinput'
import Biginput from '../../utils/input/Biginput'
import { darkColorTheme } from '../../constant';
import CommentCard from '../../utils/cards/CommentCard';
import BigButton from '../../utils/buttons/BigButton';

export default function Comment() {
  const [postData, setPostData] = useState({});
  const [loading, setIsLoading] = useState({});
  const [tribeDetail, setTribeDetail] = useState([]);
  const [replyVisible, setReplyVisible] = useState(null);

  const { tribeid, postid } = useParams();

  let fixMargin = 0;

  function fetchpostData(params) {
    getPost(postid).then((res) => {
      setPostData(res.data.data);
      setIsLoading(false);
    })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }

  function fetchTribeDetail(params) {
    getTribeDetails(tribeid).then((res) => {
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
  }, [])

  function ReplyInput(params) {
   function handleCLose(){
    setReplyVisible(null)
   }
    return (
      <div style={{ border: '1px solid #666', borderRadius: 30, padding: 15,marginBlock:10 }}>
        <Biginput style={{ background: 'none', border: 'none', padding: 0 }} minHeight={40} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>T</div>
          <div className='div-center' style={{ paddingBlock: 10 }}>
            <BigButton onClick={handleCLose} title={'cancel'} style={{ marginRight: 10, background: '#666' }} />
            <BigButton title={'comment'} style={{ background: darkColorTheme.secondaryTextColor }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='main-content' style={{ padding: "10px 90px 10px 40px", paddingBlock: 10, display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <IconButton Icon={IoIosArrowRoundBack} />
      </div>
      <div style={{ flex: '1', paddingInline: 15, paddingBlock: 5, }}>
        <PostCard data={postData} tribeIndo={tribeDetail} style={{ paddingInline: 0, paddingBlock: 0, }} />
        <Basicinput placeHolder={'Add a comment'} style={{ padding: 15, marginBlock: 20 }} />
        <div style={{ marginBlock: 30 }}>
          <CommentCard />
          {[1, 2, 34, 5].map((item, index) => {
            fixMargin = fixMargin + 38
            return (
              <div key={index} style={{ marginLeft: fixMargin, marginTop: 10 }}>
                <CommentCard
                  style={{}}
                  onReplyClick={() => setReplyVisible(index)} // Show ReplyInput for the clicked comment
                />
                {replyVisible === index && <ReplyInput />}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ flex: '0.4', marginLeft: 15 }}>
        <TribeSideInfo tribeDetail={tribeDetail} />
      </div>
    </div>
  )
}
