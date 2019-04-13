import React from 'react';

export default function PostMessage({ postInput, handleCreatePost, handlePostInputChange }) {
  return (
    <div className='postMessage'>
      <form onSubmit={e => handleCreatePost(e)}>
        <input
          type='text'
          name='text'
          id='postInput'
          className='input postInput'
          placeholder='New Message'
          autoComplete='off'
          required
          value={postInput}
          onChange={handlePostInputChange}
        />
        <input className='button postButton' type='submit' value='Send' />
      </form>
    </div>
  );
}
