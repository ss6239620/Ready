import React, { useState, useEffect, useCallback } from 'react';
import PopularCarouselCard from '../../utils/cards/PopularCarouselCard';
import HorizontalCarousel from '../../utils/Carousel.js/HorizontalCarousel';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import InfiniteScroll from '../../utils/InfiniteScroll';
import Underline from '../../utils/Underline';
import PostCard from '../../utils/cards/PostCard';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';
import { darkColorTheme } from '../../constant';
import { getPopularFeed, getRecentPost, getTrendingTodayPost } from '../../services/posts';

export default function Popular() {

    const [postData, setPostData] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [recentPost, setRecentPost] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchTrendingPost, setSearchTrendingPost] = useState([])
  
    const fetchHomeFeed = useCallback((page) => {
        getPopularFeed(page, 2)
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
  
    function fetchTrendingTodayPost(params) {
        setLoading(true)
        getTrendingTodayPost().then((res) => {
            console.log(res.data.data);
            setSearchTrendingPost(res.data.data)
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }
    
  
    useEffect(() => {
      document.title = 't/popular';
      fetchRecentPost();
      fetchTrendingTodayPost();
    }, [])

    const renderItem = (item, index) => (
        <PopularCarouselCard key={index} data={item} />
    );

    return (
        <div
            className="main-content"
            style={{ marginInline: 70, paddingBlock: 10, position: 'relative',zIndex:10 }}
        >
            { !loading? 
            <div style={{ position: 'relative', height: 210 }}>
                <HorizontalCarousel items={searchTrendingPost} renderItem={renderItem} style={{ position: 'absolute' }} />
            </div>
            :
            <div>Loading...</div>
            }
            <div style={{ display: 'flex',gap:10 }}>
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
                    <div
                        className="slectDivContainer main-content"
                        style={{
                            marginBlock: 10,
                            overflowY: "auto",
                            maxHeight: "calc(100vh - 90px)", // Adjust based on the header/footer size
                            position: 'sticky',
                            // width: '100%',
                            zIndex: 0,
                            flex: 0.44,
                            top: 60,
                            bottom: 0,
                        }}>
                        <div className='fixed-bg' style={{  padding: 15, borderRadius: 10 }}>
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
                    </div> : <div>Loading...</div>
                }
            </div>
        </div>
    );
}
