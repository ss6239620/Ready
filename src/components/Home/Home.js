import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from "../../Context/UserContext";
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import Underline from '../../utils/Underline';
import { getHomeFeed, getRecentPost } from '../../services/posts';
import PostCard from '../../utils/cards/PostCard';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';
import { darkColorTheme } from '../../constant';
import { truncateText } from '../../utils/CommonFunction';
import '../../asset/css/Home.css'
import '../../asset/css/Sidebar.css'
import InfiniteScroll from '../../utils/InfiniteScroll';

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [recentPost, setRecentPost] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useUser();

  const fetchHomeFeed = useCallback((page) => {
    console.log('fetched....',page);

    getHomeFeed(page, 2)
      .then((res) => {
        setPostData((prevData) => [...prevData, ...res.data.data]); // Append new posts
        setHasMore(res.data.data.length > 0);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  function fetchRecentPost(params) {
    setLoading(true)
    getRecentPost().then((res) => {
      setRecentPost(res.data.data)
      setLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }


  

  useEffect(() => {
    fetchRecentPost();
  }, [])

  return (
    <div className="main-content" style={{ paddingLeft: 100, paddingBlock: 5, display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex' }}>
          <SimpleDropdown title={'Best'} />
        </div>
        <InfiniteScroll fetchData={fetchHomeFeed} hasMoreData={hasMore}>
          {postData.map((item, index) => (
            <div style={{ marginBlock: 5, marginInline: 10 }} key={index}>
              <Underline style={{ marginBlock: 5, paddingInline: 10 }} color={darkColorTheme.divider} />
              <PostCard
                data={item}
                tribeInfo={item.posted_tribe_id}
                hoverEfftect
              />
            </div>
          ))}
        </InfiniteScroll>
        {/* {postLoading && <div>Loading...</div>} */}
        {!hasMore && <div>No More Posts To Show</div>}
      </div>
      {!loading ?
        <div style={{ flex: 0.5, }}>
          <div
            className="slectDivContainer main-content"
            style={{
              marginBlock: 10,
              overflowY: "auto",
              maxHeight: "calc(100vh - 100px)", // Adjust based on the header/footer size
              position: 'fixed',
              width: '22%'
            }}>
            <div style={{ background: 'black', padding: 15, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ color: darkColorTheme.secondaryTextColor, fontWeight: 500, marginBlock: 15 }}>RECENT POSTS</h5>
                <a style={{ color: '#648EFC', cursor: 'pointer' }}>Clear</a>
              </div>
              {
                recentPost.map((item, key) => (
                  <PostSummaryCard key={key} data={item} />
                ))
              }
            </div>
          </div>
        </div> : <div>Loading...</div>
      }
    </div>
  );
}
