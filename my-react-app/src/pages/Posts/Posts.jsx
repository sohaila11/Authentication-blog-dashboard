import {useEffect } from "react";
import {fetchPosts}  from "../../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Posts.css"


const Posts = () => {
  const dispatch=useDispatch();
  const posts = useSelector((state)=>state.posts.list);

  useEffect(()=>{
    dispatch(fetchPosts());
  },[dispatch]);



  return (
    <>
    <h2>All Posts</h2>
    <div className="posts"> 
      {posts.length > 0 ? (
        posts.map((post,index) => (
          <div className ="post" key={`${post.id}-${index}`}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">Published at : {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-CA"):"No data avaliable"}</p>
            <p className="post-content">{post.content}</p>
          </div>
        ))
      ) : (
        <p> No Posts avaliable</p>
      )}
    </div>
    </>
  );
};
export default Posts;
