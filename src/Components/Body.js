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
      <div className='loading-div' style={{
        display: loading === true ? 'flex' : 'none',
      }}>
        <div id='list' className='list'>
          <LoadingSpinner
            renderSpinner={renderSpinner}
          />
        </div>
      </div>
      <div className='loaded-div' style={{
        display: loading === false ? 'flex' : 'none',
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
