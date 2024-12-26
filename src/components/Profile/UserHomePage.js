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
    document.title=`${user.user.username} - Tribe`
  }, [])
  

  return (
    <div className='div-center' style={{ marginInline: 80, marginTop: 80, gap: 10 }}>
      <div style={{ flex: 1, }}>
        <div className='div-center' style={{ alignItems: 'flex-end', gap: 20 }}>
          <div
            style={{
              borderRadius: 10,
              background: 'red',
              position: 'relative'
            }}
          >
            <div style={{ background: 'red', padding: 12, position: 'absolute', borderEndEndRadius: 20, top: 0, left: 0 }} />
            <div style={{ background: 'red', padding: 12, position: 'absolute', borderStartStartRadius: 20, bottom: 0, right: 0 }} />
            <img
              src={`${FILE_URL}/${user.user?.profile_avtar}`}
              alt="communities-logo"
              style={{
                width: "100px", // Fixed size
                height: "130px", // Fixed size
                objectFit: "cover", // Ensures the aspect ratio is preserved
                borderRadius: 15,
                padding: 7
              }}
            />
          </div>
          <div>
            <h4
              style={{
                marginInline: 3,
                marginBlock: 5,
                fontSize: 23,
                fontWeight: "bold",
              }}
            >
              {user.user.username}
            </h4>
            <h5
              style={{
                marginInline: 3,
                marginBlock: 0,
                fontSize: 14,
                color: darkColorTheme.secondaryTextColor,
                fontWeight: 400,
              }}
            >
              u/{user.user.username}
            </h5>
          </div>
        </div>
        <div style={{ marginBlock: 30 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <BigButton
              style={{
                background: selectedTab === 1 ? darkColorTheme.divider : null,
                borderRadius: 50,
                paddingInline: 25,
              }}
              title={"Posts"}
              onClick={() => handleTabSwitch(1)}
            />
            <BigButton
              style={{
                background: selectedTab === 2 ? darkColorTheme.divider : null,
                borderRadius: 50,
                paddingInline: 25,
              }}
              title={"Comments"}
              onClick={() => handleTabSwitch(2)}
            />
            <BigButton
              style={{
                background: selectedTab === 3 ? darkColorTheme.divider : null,
                borderRadius: 50,
                paddingInline: 25,
              }}
              title={"Hidden"}
              onClick={() => handleTabSwitch(3)}
            />
            <BigButton
              style={{
                background: selectedTab === 4 ? darkColorTheme.divider : null,
                borderRadius: 50,
                paddingInline: 25,
              }}
              title={"Upvoted"}
              onClick={() => handleTabSwitch(4)}
            />
            <BigButton
              style={{
                background: selectedTab === 5 ? darkColorTheme.divider : null,
                borderRadius: 50,
                paddingInline: 25,
              }}
              title={"Downvoted"}
              onClick={() => handleTabSwitch(5)}
            />
          </div>
          <div className='div-center' style={{ gap: 10, alignItems: 'baseline' }}>
            <ButtonWIthBorder onClick={() => navigate('/createpost')} iconSize={20} title={'Create Post'} Icon={FaPlus} style={{ background: 'transparent', marginTop: 20 }} />
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
      <div style={{ flex: 0.4, position: 'relative' }}>
        <div
          className="slectDivContainer main-content"
          style={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 90px)", // Adjust based on the header/footer size
            position: 'fixed',
            width: '21%',
            top: 10
          }}>
          <div style={{ background: 'black', padding: 15, borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ color: darkColorTheme.secondaryTextColor, fontWeight: 500, marginBlock: 15 }}>RECENT POSTS</h5>
              <a style={{ color: '#648EFC', cursor: 'pointer' }}>Clear</a>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, corporis labore? Ab voluptatem laborum, aut explicabo dicta tenetur fugiat dolores accusantium sint iusto atque dolore ullam enim, quo blanditiis cum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, inventore placeat. Eius, doloribus, aut nam ipsam velit animi eligendi et ut aliquam facilis natus tempora fugit at repellendus consequuntur dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ducimus nam maxime id vitae in! Illo fugiat harum, quas nulla eius possimus! Error doloribus enim ad natus eum assumenda provident. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi, optio molestias, consequatur doloribus quas iure natus, non ab modi quidem. Doloremque beatae ut vitae nam, autem vel quis modi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus rerum animi quisquam tenetur eaque consequuntur excepturi, in corrupti magnam, beatae inventore et eius accusamus repudiandae voluptatum itaque natus, atque voluptatibus.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
