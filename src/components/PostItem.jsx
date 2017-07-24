import React from 'react';

export default ({index, post}) => {
  return (
    <div  style={{border: 'red solid 2px', textAlign: 'left'}}>
      <div>
        {index + ") Title: " + post.title}
      </div>
      <div>
        {'subreddit: ' + post.subreddit}
      </div>
      <div>
        {'created: ' + post.created_utc}
      </div>
    </div>
  );
};
