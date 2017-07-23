import React, { Component } from 'react';
import CommentItem from './components/CommentItem';
import PostItem from './components/PostItem';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {username: '', comments: [], posts: [], finished: false};
    // , secret: '6U3NK6Teh5KOHnJ_sDbcYaTqeBk'
    this.updateUsername = this.updateUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillUpdate() {
  //   console.log(this.state.username);
  // }

  // componentDidUpdate() {
  //   window.posts = this.state.posts;
  //   window.state = this.state;
  // }

  handleButton(buttonType) {
    return () => {
      if (buttonType === 'comments') {
        this.setState({posts: [], comments: []});
        this.getUserData('comments');
      } else if (buttonType === 'posts') {
        this.setState({posts: [], comments: []});
        this.getUserData('posts');
      }

    };
    // e.preventDefault();
  }

  handleSubmit(e) {
    this.setState({posts: [], comments: []});
    // console.log(e);

    // const oauth = {
    //   client_id: 'EC1t4lAS1VL8HQ',
    //   response_type: ,
    //
    // };
    // fetch('https://www.reddit.com/user/' + this.state.username + '/comments', {
    //    method: 'get',
    //    headers: {
    //      'Authorization': 'Basic '+btoa('username:password'),
    //      'Content-Type': 'application/x-www-form-urlencoded'
    //    },
    //    body: 'A=1&B=2'
    //  });
    this.getUserData('comments');

    // fetch('https://www.reddit.com/user/' + this.state.username + '/comments.json')
    //   .then( (comments) => {
    //     console.log(comments);
    //     this.setState({comments});
    //   });
    e.preventDefault();
  }


  getUserData(type, count = null, after = null) {

    let search = (type === 'posts' ? 'submitted' : 'comments');
    let addend = count? '?count' + count + '&after=' + after : '';
    fetch('https://www.reddit.com/user/' + this.state.username + '/' + search + '.json' + addend)
      .then( (response) => {

        response.json().then( (data) => {
          const pageArray = [];

          console.log(data);
          let pageData = data.data.children;
          let last = data.data.after;
          if (last) {
            count = (count ? count : 0);
            count += 25;
            this.getUserData(type, count, last);
          } else {
            this.setState({finished: true});
          }
          let querySize = pageData.length;

          pageData.forEach( (post, index) => {
            let {subreddit, created_utc} = post.data;
            if (type === 'posts') {
              let {title} = post.data;
              pageArray.push({title, subreddit, created_utc});
            } else if (type === 'comments') {
              let {link_title, link_url, body} = post.data;
              pageArray.push({link_title, link_url, body, subreddit, created_utc});
            }
          });

          if (type === 'posts') {
            console.log('posts', pageArray);
            let newState = this.state.posts.concat(pageArray);
            this.setState({posts: newState});
          } else if (type === 'comments') {
            console.log('comments', pageArray);
            let newState = this.state.comments.concat(pageArray);
            this.setState({comments: newState});
          }
          // console.log('old', this.state.posts, posts);
          // console.log('newState', newState);
          // this.setState((prevState, props) => {
          //   return {posts: prevState.posts.concat(posts)};
          // });
        });

    })
    .catch( (error) => console.log('there was an error fetching the data: ', error));
  }

  updateUsername (e) {
    let username = e.currentTarget.value;
    this.setState({username});
  }

  renderPosts() {
    if (this.state.finished) {
      return this.state.posts.map((post, index) => {
        return (<PostItem key={index} post={post} index={index}/>);
      });
    } else {
      return (<div> So much empty for Posts</div>);
    }
  }

  renderComments() {
    if (this.state.finished) {
      return this.state.comments.map((comment, index) => {
        return (<CommentItem key={index} comment={comment} index={index}/>);
      });
    } else {
      return (<div> So much empty for Comments</div>);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Reddit Grapher!!</h2>
        </div>

        <form onSubmit={ this.handleSubmit } >
          <label>Enter Reddit User Name
           <input
             className="username"
             value={this.state.username}
             onChange={this.updateUsername}
             ></input>
          </label>
          <input type='submit' value='Get Data'></input>
        </form>

        <div style={{height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
          <button
            onClick={ () => this.setState({username: 'delisauce'})}
            style={{height: '50px', width: '300px'}}
              > Test delisauce (2 comments, 0 posts) </button>
          <button
            onClick={ () => this.setState({username: 'oldcrook'})}
            style={{height: '50px', width: '300px'}}
              > Test (6 comments, 19 posts) </button>
          <button
            onClick={ () => this.setState({username: 'iPoopedJustNow'})}
            style={{height: '50px', width: '300px'}}
              > Test (504 comments, 14 posts) </button>
          <button
            onClick={ () => this.setState({username: 'TrowwayFiggenstein'})}
            style={{height: '50px', width: '300px'}}
            > Test (1000 comments, 31 posts) </button>
        </div>

        <div>
          <button onClick={ this.handleButton('comments') }>Get Comments (Max 1000)</button>
          <button onClick={ this.handleButton('posts') }>Get Posts</button>
        </div>

        <div> {this.renderPosts()}</div>
        <div> {this.renderComments()}</div>

      </div>
    );
  }
}

export default App;
