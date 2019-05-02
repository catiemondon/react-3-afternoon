import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      myUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.componentDidMount= this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
  axios.get(`${this.state.myUrl}/posts`).then((response)=>{
    this.setState({ posts: response.data })
  }).catch((error)=> console.log(error))

  }

  updatePost(id, text) {
  axios.put(`${this.state.myUrl}/posts?id=${id}`, {text}).then((response)=>{
    this.setState({ posts: response.data })
  }).catch((error)=> console.log(error))
  }

  deletePost(id) {
    axios.delete(`${this.state.myUrl}/posts?id=${id}`).then((response)=>{
      this.setState({ posts: response.data })
    }).catch((error)=> console.log(error))
  }

  createPost(text) {
    axios.post(`${this.state.myUrl}/posts`, { text }).then((response)=>{
      this.setState({ posts: response.data})
    }).catch()

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map( post => (
              <Post key={ post.id } text={ post.text } date={ post.date} updatePostFn={ this.updatePost } id={post.id} deletePostFn={this.deletePost} />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
