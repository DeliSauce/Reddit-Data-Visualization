import React, {Component} from 'react';

export default ({index, post}) => {
  return (
    <div  style={{border: 'black solid 1px', textAlign: 'left'}}>
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
