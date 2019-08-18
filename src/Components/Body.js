import React from 'react';
import PostMessage from './PostMessage';
import LoadingSpinner from './LoadingSpinner';

export default function Body({
  posts,
  renderPost,
  handleCreatePost,
  postInput,
  handlePostInputChange,
  loading,
  renderSpinner
}) {
  return (
    <div className='Body'>
      <div style={{
        display: loading === true ? 'block' : 'none',
      }}>
        <div id='list' className='list'>
          <LoadingSpinner
            renderSpinner={renderSpinner}
          />
        </div>
      </div>
      <div style={{
        display: loading === false ? 'block' : 'none',
      }}>
        <div id='list' className='list'>
          <ol>{posts.map(n => renderPost(n))}</ol>
        </div>
      </div>
      <PostMessage
        postInput={postInput}
        handleCreatePost={handleCreatePost}
        handlePostInputChange={handlePostInputChange}
      />
    </div>
  );
}
