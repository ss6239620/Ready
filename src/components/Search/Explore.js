import React from 'react'
import RichTextEditor from '../../utils/RichTextEditor';

export default function Explore() {
  const handleSave = (content) => {
    console.log("Saved Content: ", content);
    // Post this content to your server or database.
  };
  return (
    <div className='main-content' style={{marginTop:200}}>
      <RichTextEditor onSave={handleSave} />
    </div>
  )
}
