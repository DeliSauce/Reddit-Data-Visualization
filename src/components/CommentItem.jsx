import React, {Component} from 'react';

export default ({index, comment}) => {
  return (
    <div  style={{border: 'black solid 1px', textAlign: 'left'}}>
      <div>
        {index + ") Title: " + comment.link_title}
      </div>
      <div>
        {'link_url: ' + comment.link_url}
      </div>
      <div>
        {'comment: ' + comment.body}
      </div>
      <div>
        {'subreddit: ' + comment.subreddit}
      </div>
      <div>
        {'created: ' + comment.created_utc}
      </div>
    </div>
  );
};
