import React, { useEffect, useState } from 'react'
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

export default function SearchHomePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchPosts, setMatchPosts] = useState([]);
  const [matchTribe, setMatchTribe] = useState([]);
  const [matchComment, setMatchComment] = useState([]);
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q');

  function fetchMatchedPost(params) {
    setLoading(true)
    searchPost(query).then((res) => {
      setMatchPosts(res.data.data)
      setLoading(false)
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })
  }

  function fetchMatchedTribe(params) {
    setLoading(true)
    recommendedSearch(query).then((res) => {
      setMatchTribe(res.data.data)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data);
      setLoading(false)
    })
  }

  function fetchMatchedComments(params) {
    setLoading(true)
    searchComments(query).then((res) => {
      setMatchComment(res.data.data)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data);
      setLoading(false)
    })
  }


  function fetchMatches(params) {
    if (selectedTab === 0) {
      fetchMatchedPost();
      fetchMatchedTribe();
    } else if (selectedTab === 1) {
      fetchMatchedTribe();
    } else if (selectedTab === 2) {
      fetchMatchedComments();
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [selectedTab])


  function handleTabSwitch(tabNum) {
    setSelectedTab(tabNum);
  }

  return (
    <div className='main-content' >
      <div style={{ padding: '20px 100px 0 80px' }}>
        <div style={{ display: "flex", gap: 20 }}>
          <BigButton
            style={{
              background: selectedTab === 0 ? darkColorTheme.divider : null,
              borderRadius: 50,
              paddingInline: 25,
              padding: 0
            }}
            title={"Posts"}
            onClick={() => handleTabSwitch(0)}
          />
          <BigButton
            style={{
              background: selectedTab === 1 ? darkColorTheme.divider : null,
              borderRadius: 50,
              paddingInline: 25,
            }}
            title={"Tribes"}
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
            title={"People"}
            onClick={() => handleTabSwitch(3)}
          />
        </div>
        <div className='div-center' style={{ marginBlock: 20, gap: 15 }}>
          <SimpleDropdown title={"Relevance"} />
          <SimpleDropdown title={"All time"} />
          <SimpleDropdown title={"Safe Search off"} />
          <Underline color={darkColorTheme.divider} sizeInPx={'1px'} />
        </div>
        {!loading ?
          <div>
            {selectedTab === 0 &&
              <div className='div-center' style={{ gap: 15, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  {matchPosts.map((item, key) => (
                    <PostSummaryCard data={item} no_of_charactor={150} key={key} hoverEffect not_require />
                  ))}
                </div>
                <div
                  style={{
                    position: 'sticky',
                    top: 100,
                    marginTop: 20,
                  }}>
                  <div className="slectDivContainer" style={{ background: 'black', padding: 15, borderRadius: 10, width: '100%', overflowY: 'auto', maxHeight: "calc(100vh - 100px)", }}>
                    <h5 style={{ color: darkColorTheme.secondaryTextColor, fontWeight: 500, marginBlock: 0 }}>TRIBES</h5>
                    {
                      matchTribe.map((item, key) => (
                        <div style={{ width: '100%', paddingBlock: 10 }}>
                          <TribeSummaryCard key={key} no_of_charactor={25} hoverEffect data={item} style={{ padding: 10, width: 'auto' }} not_require />
                        </div>
                      ))
                    }

                    <h5 style={{ color: darkColorTheme.secondaryTextColor, fontWeight: 500, marginBlock: 0 }}>PEOPLE</h5>
                  </div>
                </div>

              </div>
            }
            {selectedTab === 1 &&
              < div >
                {
                  matchTribe.map((item, key) => (
                    <TribeSummaryCard key={key} hoverEffect data={item} />
                  ))
                }
              </div>
            }
            {selectedTab === 2 &&
              <div>
                {
                  matchComment.map((item, key) => (
                    <CommentSummaryCard key={key} postData={item.post_id} commentedUserData={item.created_by} commentData={item} hoverEffect />
                  ))
                }
              </div>
            }
          </div> : <div>Loading....</div>}
      </div>
    </div >
  )
}
