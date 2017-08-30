import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Posts extends Component {
  constructor() {
    super();

    this.state = {
      post: {
        title: 'This is a FAKE blog post title',
        _id: '123FakeUser456',
        content: 'This is some FAKE content',
        author: 'ObjectID(fakeID)',
        comments: [
          {text:'This is a FAKE comment', author: 'Bob Obb'},
      ]},
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3030/posts')
      .then((post) => {
        this.setState({ posts: post.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    console.log(this.state.posts);
    if (!posts) return (<div></div>);
    return(
      <div>
      <h2>Blog Posts</h2>
      <Link to='/new-post'><button className="btn btn-default btn-sm">Create New Post</button></Link>
        {posts.map((post) => {
          return (
              <div key={post._id}>
                {post.title}
              </div>
            )
        })}
      </div>
    );
  }
}
