import React, { useCallback, useEffect, useState } from 'react'
import { darkColorTheme, FILE_URL } from '../../constant';
import BigButton from '../../utils/buttons/BigButton';
import ButtonWIthBorder from '../../utils/buttons/ButtonWIthBorder';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import { useNavigate } from 'react-router-dom';
import ProfileComment from './ProfileComment';
import { FaPlus } from 'react-icons/fa';
import { getAllUserPosts } from '../../services/posts';
import { getAllUserComment } from '../../services/comment';
import InfiniteScroll from '../../utils/InfiniteScroll';
import PostCard from '../../utils/cards/PostCard';

export default function UserHomePage() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [hasMore, setHasMore] = useState({
    postHasMore: true,
    commentHasMore: true
  });
  const [data, setData] = useState({
    postData: [],
    commentData: []
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAllUserPosts = useCallback((page) => {
    getAllUserPosts(page).then((res) => {
      setData(prevData => ({
        ...prevData, postData: [...prevData.postData, ...res.data.data]
      }))
      setHasMore(prev => ({ ...prev, postHasMore: res.data.data.length > 0 }))
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const fetchAllUserComment = useCallback((page) => {
    getAllUserComment(page).then((res) => {
      setData(prevData => ({
        ...prevData, commentData: [...prevData.commentData, ...res.data.data]
      }))
      console.log(res.data.data);

      setHasMore(prev => ({ ...prev, commentHasMore: res.data.data.length > 0 }))
    }).catch(err => {
      console.log(err.response.data);
    })
  }, []);

  function handleTabSwitch(tabNum) {
    setSelectedTab(tabNum);
  }

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${user.user.username} - Tribe`
  }, [])


  return (
    <div className='div-center mx-20 gap-3 mt-20' >
      <div className='flex-1' >
        <div className='div-center items-end gap-5 '>
          <div
            className='rounded-lg bg-[var(--teritory)] relative'
          >
            <div className='bg-[var(--teritory)] p-3 absolute rounded-ee-2xl top-0 left-0 ' />
            <div className='bg-[var(--teritory)] p-3 absolute rounded-ss-2xl right-0 bottom-0 ' />
            <img
              src={`${FILE_URL}/${user.user?.profile_avtar}`}
              alt="communities-logo"
              className="img-small-style w-[100px!important] h-[130px!important] rounded-[15px!important] p-2 "
            />
          </div>
          <div>
            <h4
              className='extra-large-text-extra-large-weight'
            >
              {user.user.username}
            </h4>
            <h5
              className='small-text-normal-weight secondary-text'
            >
              u/{user.user.username}
            </h5>
          </div>
        </div>
        <div className='my-8' >
          <div className='flex gap-3' >
            <BigButton
              className={`${selectedTab === 1 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
              title={"Posts"}
              onClick={() => handleTabSwitch(1)}
            />
            <BigButton
              className={`${selectedTab === 2 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
              title={"Comments"}
              onClick={() => handleTabSwitch(2)}
            />
            <BigButton
              className={`${selectedTab === 3 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
              title={"Hidden"}
              onClick={() => handleTabSwitch(3)}
            />
            <BigButton
              className={`${selectedTab === 4 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
              title={"Upvoted"}
              onClick={() => handleTabSwitch(4)}
            />
            <BigButton
              className={`${selectedTab === 5 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
              title={"Downvoted"}
              onClick={() => handleTabSwitch(5)}
            />
          </div>
          <div className='div-center gap-3 mt-5' >
            <ButtonWIthBorder onClick={() => navigate('/createpost')} iconSize={20} title={'Create Post'} Icon={FaPlus} />
            <SimpleDropdown title={'New'} />
          </div>

          <div>
            {selectedTab === 1 &&
              <InfiniteScroll fetchData={fetchAllUserPosts} hasMoreData={hasMore.postHasMore}>
                {data.postData.map((item, key) => (
                  <PostCard
                    data={item}
                    tribeInfo={item.posted_tribe_id}
                    hoverEfftect
                    key={key}
                  />
                ))}
              </InfiniteScroll>
            }
          </div>

          <div>
            {selectedTab === 2 &&
              <InfiniteScroll fetchData={fetchAllUserComment} hasMoreData={hasMore.commentHasMore}>
                {data.commentData.map((item, key) => (
                  <ProfileComment key={key} hoverEffect data={item} />
                ))}
              </InfiniteScroll>
            }
          </div>

        </div>
      </div>
      <div className='flex-[0.4] relative z-[1]'>
        <div
          className="slectDivContainer main-content fixed-component max-h-[calc(100vh-90px)] top-3 w-[21%] ">
          <div className='fixed-bg p-4 rounded-lg '>
            <div className='div-center-justify'>
              <h5 className='medium-text-large-weight secondary-text' >RECENT POSTS</h5>
              <a className='accent-text cursor-pointer'>Clear</a>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, corporis labore? Ab voluptatem laborum, aut explicabo dicta tenetur fugiat dolores accusantium sint iusto atque dolore ullam enim, quo blanditiis cum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, inventore placeat. Eius, doloribus, aut nam ipsam velit animi eligendi et ut aliquam facilis natus tempora fugit at repellendus consequuntur dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ducimus nam maxime id vitae in! Illo fugiat harum, quas nulla eius possimus! Error doloribus enim ad natus eum assumenda provident. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi, optio molestias, consequatur doloribus quas iure natus, non ab modi quidem. Doloremque beatae ut vitae nam, autem vel quis modi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus rerum animi quisquam tenetur eaque consequuntur excepturi, in corrupti magnam, beatae inventore et eius accusamus repudiandae voluptatum itaque natus, atque voluptatibus.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
