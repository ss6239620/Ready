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
            className="main-content mx-16 py-3 relative z-10"
        >
            {!loading ?
                <div className='relative h-[210px]' >
                    <HorizontalCarousel className={'absolute'} items={searchTrendingPost} renderItem={renderItem} />
                </div>
                :
                <div>Loading...</div>
            }
            <div className='flex gap-3' >
                <div className='flex-1'>
                    <div className='flex'>
                        <SimpleDropdown title={'Best'} />
                    </div>
                    <InfiniteScroll fetchData={fetchHomeFeed} hasMoreData={hasMore}>
                        {postData.map((item, index) => (
                            <div className='my-1 mx-3'  key={index}>
                                <Underline className='my-1 px-3' color={darkColorTheme.divider} />
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
                        className="slectDivContainer main-content sticky-component flex-[0.44] my-3 top-16 bottom-0 max-h-[calc(100vh_-_90px)] "
                    >
                        <div className='fixed-bg p-4 rounded-xl' >
                            <div className='div-center-justify' >
                                <h5 className='secondary-text medium-text-large-weight' >RECENT POSTS</h5>
                                <a className='accent-text cursor-pointer'>Clear</a>
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
