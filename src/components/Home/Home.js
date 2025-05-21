import React from 'react';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import Underline from '../../utils/Underline';
import PostCard from '../../utils/cards/PostCard';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';
import { darkColorTheme } from '../../constant';
import '../../asset/css/Home.css';
import '../../asset/css/Sidebar.css';
import InfiniteScroll from '../../utils/InfiniteScroll';
import { useHomeFeed, useRecentPost } from '../../hooks/postHook';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';

export default function Home() {

  const { data: recentPostData, isLoading: recentPostisLoading, error: recentPostError } = useRecentPost();

  // Fetch home feed using React Query's useInfiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useHomeFeed();

  const navigate = useNavigate();

  const { user } = useUser();

  if (!user) {
    navigate('/popular');
  }

  // Flatten the pages array
  const postData = data ? data.pages.flatMap(page => page.data.data) : [];

  return (
    <div className="main-content px-[70px] py-[5px] flex gap-10">
      <div className='flex-1'>
        <div className='flex'>
          <SimpleDropdown title={'Best'} />
        </div>
        <InfiniteScroll fetchData={fetchNextPage} hasMoreData={hasNextPage}>
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
        {isFetchingNextPage && <div>Loading more posts...</div>}
        {!hasNextPage && <div>No More Posts To Show</div>}
      </div>
      {!recentPostisLoading ? (
        <div className="slectDivContainer main-content sticky-component my-[10px] max-h-[calc(100vh-100px)] flex-[0.44] top-[60px] bottom-[10px]">
          <div className='fixed-bg p-[15px] rounded-[10px]'>
            <div className='div-center justify-between'>
              <h5 className='medium-text-normal-weight secondary-text my-[15px]'>RECENT POSTS</h5>
              <a className='cursor-pointer accent-text'>Clear</a>
            </div>
            {recentPostData?.map((item, key) => (
              <PostSummaryCard key={key} data={item} />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}