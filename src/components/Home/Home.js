import React from 'react'
import { useUser } from "../../Context/UserContext";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  
  return (
    <div className='main-content'>
       Home
    </div>

  )
}
