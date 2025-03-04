import React, { useEffect } from 'react';
import PopularCarouselCard from '../../utils/cards/PopularCarouselCard';
import HorizontalCarousel from '../../utils/Carousel.js/HorizontalCarousel';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import InfiniteScroll from '../../utils/InfiniteScroll';
import Underline from '../../utils/Underline';
import PostCard from '../../utils/cards/PostCard';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';
import { darkColorTheme } from '../../constant';
import { usePopularFeed, useRecentPost, useTrendingTodayPost } from '../../hooks/postHook';

export default function Popular() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = usePopularFeed();

    const postData = data ? data.pages.flatMap(page => page.data.data) : [];

    const { data: recentPostData, isLoading: recentPostisLoading, error: recentPostError } = useRecentPost();
    const { data: searchTrendingPost, isLoading: isSearchTrendingPostLoading } = useTrendingTodayPost();


    useEffect(() => {
        document.title = 't/popular';
    }, [])

    const renderItem = (item, index) => (
        <PopularCarouselCard key={index} data={item} />
    );

    return (
        <div
            className="main-content mx-16 py-3 relative z-10"
        >
            {!isSearchTrendingPostLoading ?
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
                    <InfiniteScroll fetchData={fetchNextPage} hasMoreData={hasNextPage}>
                        {postData.map((item, index) => (
                            <div className='my-1 mx-3' key={index}>
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
                    {!hasNextPage && <div>No More Posts To Show</div>}
                </div>
                {!recentPostisLoading ?
                    <div
                        className="slectDivContainer main-content sticky-component flex-[0.44] my-3 top-16 bottom-0 max-h-[calc(100vh_-_90px)] "
                    >
                        <div className='fixed-bg p-4 rounded-xl' >
                            <div className='div-center-justify' >
                                <h5 className='secondary-text medium-text-large-weight' >RECENT POSTS</h5>
                                <a className='accent-text cursor-pointer'>Clear</a>
                            </div>
                            {
                                recentPostData?.map((item, key) => (
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
