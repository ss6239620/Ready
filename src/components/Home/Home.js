import React, { useEffect, useState, useCallback } from 'react';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import Underline from '../../utils/Underline';
import { getHomeFeed, getRecentPost } from '../../services/posts';
import PostCard from '../../utils/cards/PostCard';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';
import { darkColorTheme } from '../../constant';
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

  const fetchHomeFeed = useCallback((page) => {
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
    document.title = 'Tribe -Welcome to Tribe Your Community Hub';
    fetchRecentPost();
  }, [])

  return (
    <div className="main-content px-[70px] py-[5px] flex gap-10" >
      <div className='flex-1'>
        <div className='flex' >
          <SimpleDropdown title={'Best'} />
        </div>
        <InfiniteScroll fetchData={fetchHomeFeed} hasMoreData={hasMore}>
          {postData.map((item, index) => (
            <div className='my-[5px] mx-[10px]' key={index}>
              <Underline className='my-[5px] px-[10px]' color={darkColorTheme.divider} />
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
          <div
            className="slectDivContainer main-content sticky-component my-[10px] max-h-[calc(100vh-100px)] flex-[0.44] top-[60px] bottom-[10px] ">
            <div className='fixed-bg p-[15px] rounded-[10px] '>
              <div className='div-center justify-between'>
                <h5 className='medium-text-normal-weight secondary-text my-[15px]' >RECENT POSTS</h5>
                <a className='cursor-pointer accent-text'>Clear</a>
              </div>
              {
                recentPost.map((item, key) => (
                  <PostSummaryCard key={key} data={item} />
                ))
              }
            </div>
        </div> : <div>Loading...</div>
      }
    </div>
  );
}
