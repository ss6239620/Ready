import React, { useState, useEffect } from 'react';
import RippleEffect from './RippleEffect'

const InfiniteScroll = ({ fetchData, hasMoreData, children }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // page state is now managed here

  // Function to fetch more data when scrolled to the bottom
  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;  // Prevent multiple requests
    setLoading(true);

    // Fetch new data using the fetchData prop
    await fetchData(page);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData(); // Initial fetch for the current page
  }, [page, fetchData]);  // Depend on page and fetchData

  // Handle window scroll event
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const threshold = document.documentElement.scrollHeight - 100; // Trigger when 100px from bottom

    if (scrollPosition >= threshold && hasMoreData) {
      setPage((prevPage) => prevPage + 1); // Increment page when the user scrolls down
    }
  };

  // Set up scroll event listener on window
  useEffect(() => {
    const throttleScroll = () => {
      if (!loading && hasMoreData) {
        handleScroll();
      }
    };

    // Adding scroll event listener
    window.addEventListener('scroll', throttleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, [loading, hasMoreData]); // Only trigger when loading state or hasMoreData changes

  return (
    <div>
      {children}
      {loading && <div className='div-justify-center mt-12'><RippleEffect alt={'loader'} src={require('../asset/img/logo.png')} size={80} /></div>}
    </div>
  );
};

export default InfiniteScroll;
