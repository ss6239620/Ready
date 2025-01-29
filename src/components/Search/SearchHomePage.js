import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BigButton from '../../utils/buttons/BigButton';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import Underline from '../../utils/Underline';
import { darkColorTheme } from '../../constant';
import { searchPost } from '../../services/posts';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';
import TribeSummaryCard from '../../utils/cards/TribeSummaryCard';
import { recommendedSearch } from '../../services/tribe';
import CommentSummaryCard from '../../utils/cards/CommentSummaryCard';
import { searchComments } from '../../services/comment';
import RadioInput from '../../utils/input/RadioInput';
import { search_filter, search_filter_safe, search_filter_time } from '../../asset/data/dropDownData';
import InfiniteScroll from '../../utils/InfiniteScroll';

export default function SearchHomePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchPosts, setMatchPosts] = useState([]);
  const [matchTribe, setMatchTribe] = useState([]);
  const [postSideData, setPostSideData] = useState([]);
  const [matchComment, setMatchComment] = useState([]);
  const [hasMore, setHasMore] = useState({
    postHasMore: true,
    tribeHasMore: true,
    commentHasMore: true
  });
  const [loading, setLoading] = useState(false);
  const [radioSelected1, setRadioSeleceted1] = useState(search_filter[0]);
  const [radioSelected2, setRadioSeleceted2] = useState(search_filter_time[0]);
  const [radioSelected3, setRadioSeleceted3] = useState(search_filter_safe[0]);

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q');

  const fetchMatchedPost = useCallback((page) => {
    searchPost(query, page).then((res) => {
      setMatchPosts(prev => [...prev, ...res.data.data])
      setHasMore(prev => ({ ...prev, postHasMore: res.data.data.length > 0 }))
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const fetchMatchedTribe = useCallback((page) => {
    recommendedSearch(query, page).then((res) => {
      setMatchTribe(prev => [...prev, ...res.data.data])
      setHasMore(prev => ({ ...prev, tribeHasMore: res.data.data.length > 0 }))
    }).catch(err => {
      console.log(err.response.data);
    })
  }, []);


  const fetchMatchedComments = useCallback((page) => {
    searchComments(query, page).then((res) => {
      setMatchComment(prev => [...prev, ...res.data.data])
      console.log(res.data.data);
      setHasMore(prev => ({ ...prev, commentHasMore: res.data.data.length > 0 }))
    }).catch(err => {
      console.log(err.response.data);
    })
  }, []);

  function fetchSideData(params) {
    setLoading(true)
    recommendedSearch(query, 1).then((res) => {
      setPostSideData(res.data.data)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data);
      setLoading(false)
    })
  }

  useEffect(() => {
    document.title = `${query} - Tribe Search!`
    fetchSideData()
  }, [])



  function handleTabSwitch(tabNum) {
    setSelectedTab(tabNum);
  }

  return (
    <div className='main-content' >
      <div className='p-[20px_100px_0px_80px]' >
        <div className='flex gap-5' >
          <BigButton
            className={`${selectedTab === 0 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
            title={"Posts"}
            onClick={() => handleTabSwitch(0)}
          />
          <BigButton
            className={`${selectedTab === 1 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
            title={"Tribes"}
            onClick={() => handleTabSwitch(1)}
          />
          <BigButton
            className={`${selectedTab === 2 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
            title={"Comments"}
            onClick={() => handleTabSwitch(2)}
          />
          <BigButton
            className={`${selectedTab === 3 ? 'secondary-bg' : ''} rounded-[50px] px-[25px!important]`}
            title={"People"}
            onClick={() => handleTabSwitch(3)}
          />
        </div>
        <div className='div-center mb-5 gap-4 '>
          <SimpleDropdown title={radioSelected1} childClassName={'w-[200px]'}>
            {search_filter.map((item, key) => (
              <RadioInput key={key} title={item} selected={radioSelected1} setSelected={setRadioSeleceted1} />
            ))}
          </SimpleDropdown>
          <SimpleDropdown title={radioSelected2} childClassName={'w-[200px]'}>
            {search_filter_time.map((item, key) => (
              <RadioInput key={key} title={item} selected={radioSelected2} setSelected={setRadioSeleceted2} />
            ))}
          </SimpleDropdown>
          <SimpleDropdown title={`Safe Search ${radioSelected3}`} childClassName={'w-[200px]'}>
            {search_filter_safe.map((item, key) => (
              <RadioInput key={key} title={item} selected={radioSelected3} setSelected={setRadioSeleceted3} />
            ))}
          </SimpleDropdown>
          <Underline sizeInPx={'1px'} />
        </div>
        <div>
          {selectedTab === 0 &&
            <InfiniteScroll fetchData={fetchMatchedPost} hasMoreData={hasMore.postHasMore}>
              <div className='div-start gap-4'>
                <div className='flex-1'>
                  {matchPosts.map((item, key) => (
                    <PostSummaryCard data={item} no_of_charactor={150} key={key} hoverEffect not_require />
                  ))}
                </div>
                <div
                className='sticky top-[100px] mt-5'>
                  <div className="slectDivContainer fixed-bg p-4 rounded-xl w-[100%] overflow-y-auto max-h-[calc(100vh-100px)] ">
                    <h5 className='large-text-large-weight secondary-text' >TRIBES</h5>
                    {
                      postSideData.map((item, key) => (
                        <div className='w-[100%] py-2' key={key}>
                          <TribeSummaryCard className={'p-[10px!important]'}  no_of_charactor={25} hoverEffect data={item}  not_require />
                        </div>
                      ))
                    }

                    <h5 className='large-text-large-weight secondary-text'>PEOPLE</h5>
                  </div>
                </div>

              </div>
            </InfiniteScroll>
          }
          {selectedTab === 1 &&
            <InfiniteScroll fetchData={fetchMatchedTribe} hasMoreData={hasMore.tribeHasMore}>

              {
                matchTribe.map((item, key) => (
                  <TribeSummaryCard key={key} hoverEffect data={item} />
                ))
              }
            </InfiniteScroll>
          }
          {selectedTab === 2 &&
            <InfiniteScroll fetchData={fetchMatchedComments} hasMoreData={hasMore.commentHasMore}>

              {
                matchComment.map((item, key) => (
                  <CommentSummaryCard key={key} postData={item.post_id} commentedUserData={item.created_by} commentData={item} hoverEffect />
                ))
              }
            </InfiniteScroll>
          }
        </div>
      </div>
    </div >
  )
}
