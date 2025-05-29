import React from 'react'
import UnModeratedCard from '../../../../utils/cards/UnModeratedCard'
import { useGetAllUnModeratedPosts } from '../../../../hooks/modHook';
import InfiniteScroll from '../../../../utils/InfiniteScroll';
import CircularLoader from '../../../../utils/CircularLoader';

export default function Unmoderator() {
    const {
        data: unApprovedUserData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isModeratorsLoading
    } = useGetAllUnModeratedPosts();

    const allUnModeratoratedPosts = unApprovedUserData?.pages?.flatMap(page => page?.data?.data) || [];

    return (
        <div className=''>
            <InfiniteScroll fetchData={fetchNextPage} hasMoreData={hasNextPage}>
                {allUnModeratoratedPosts.map((item, data) => (
                    <UnModeratedCard data={item} />
                ))}
            </InfiniteScroll>
            {isFetchingNextPage && <CircularLoader />}
            {isModeratorsLoading && <CircularLoader />}
        </div>
    )
}
