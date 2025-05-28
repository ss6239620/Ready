import React, { useEffect } from 'react';
import RippleEffect from './RippleEffect';

const InfiniteScroll = ({ fetchData, hasMoreData, children }) => {
  // Handle window scroll event
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const threshold = document.documentElement.scrollHeight - 100; // Trigger when 100px from bottom

    if (scrollPosition >= threshold && hasMoreData) {
      fetchData(); // Fetch more data when the user scrolls down
    }
  };

  // Set up scroll event listener on window
  useEffect(() => {
    const throttleScroll = () => {
      handleScroll();
    };

    // Adding scroll event listener
    window.addEventListener('scroll', throttleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, [fetchData, hasMoreData]); // Only trigger when fetchData or hasMoreData changes

  return (
    <>
      {children}
    </>
  );
};

export default InfiniteScroll;