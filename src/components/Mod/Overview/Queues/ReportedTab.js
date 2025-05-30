import React from 'react'
import UnModeratedCard from '../../../../utils/cards/UnModeratedCard'
import { useGetAllModQueuePosts } from '../../../../hooks/modHook';
import InfiniteScroll from '../../../../utils/InfiniteScroll';
import CircularLoader from '../../../../utils/CircularLoader';
import QueueClean from './QueueClean';
import { MOD_QUEUE_POST_STATUS } from '../../../../asset/data/modData';

export default function ReportedTab() {
    const {
        data: unApprovedUserData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isModeratorsLoading
    } = useGetAllModQueuePosts(MOD_QUEUE_POST_STATUS.REPORTED);

    const allUnModeratoratedPosts = unApprovedUserData?.pages?.flatMap(page => page?.data?.data) || [];

    return (
        <div className=''>
            <InfiniteScroll fetchData={fetchNextPage} hasMoreData={hasNextPage}>
                {allUnModeratoratedPosts.map((item, key) => (
                    <UnModeratedCard key={key} data={item} />
                ))}
            </InfiniteScroll>
            {isFetchingNextPage && <CircularLoader />}
            {isModeratorsLoading && <CircularLoader />}
            {!isModeratorsLoading && allUnModeratoratedPosts.length === 0 && !hasNextPage && <QueueClean />}
        </div>
    )
}
