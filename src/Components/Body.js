import React from 'react';
import PostMessage from './PostMessage';

export default function Body({
  posts,
  renderPost,
  handleCreatePost,
  postInput,
  handlePostInputChange,
}) {
  return (
    <div className='Body'>
      <div id='list' className='list'>
        <ol>{posts.map(n => renderPost(n))}</ol>
      </div>
      <PostMessage
        postInput={postInput}
        handleCreatePost={handleCreatePost}
        handlePostInputChange={handlePostInputChange}
      />
    </div>
  );
}
