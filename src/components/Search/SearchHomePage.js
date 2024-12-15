import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BigButton from '../../utils/buttons/BigButton';
import SimpleDropdown from '../../utils/dropdown/SimpleDropdown';
import Underline from '../../utils/Underline';
import { darkColorTheme } from '../../constant';
import { searchPost } from '../../services/posts';
import PostSummaryCard from '../../utils/cards/PostSummaryCard';

export default function SearchHomePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchPosts, setMatchPosts] = useState([]);
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
    })
  }

  useEffect(() => {
    fetchMatchedPost()
  }, [])


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
        <div className='div-center'>
          <div>
            {matchPosts.map((item, key) => (
              <PostSummaryCard data={item} no_of_charactor={300} key={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
