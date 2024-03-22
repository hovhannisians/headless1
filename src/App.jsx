import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Blog from './components/blog'



function App() {
 const [posts, setPosts] = useState([]);

 const fetchPosts = () => {
  axios.get("https://new.robiai.com/wp-json/wp/v2/posts").then((res) => {
    setPosts(res.data);
  })
 }

 useEffect(() => {
  fetchPosts()
 }, [])

  return (
    <div className="grid">
      {posts.map((item) => (
        <Blog post={item} />
      ))}
    </div>
    )
}

export default App
