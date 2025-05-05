import {useEffect, useState } from "react";
import {fetchPosts, deletePost,editPost}  from "../../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Posts.css"


const Posts = () => {
  const dispatch=useDispatch();
  const posts = useSelector((state)=>state.posts.list);
  const [editData,setEditData]=useState({id:"",title:"",content:""});
  const [hidden,setHidden]=useState(null);

  useEffect(()=>{
    dispatch(fetchPosts());
  },[dispatch]);
  
  const handleDelete = (postId)=>{
  dispatch(deletePost(postId));
  }
  const handleEdit=(post)=>{
    setEditData(post);
    setHidden(post.id);
  }

  const handleUpdate=()=>{
    dispatch(editPost({postId:editData.id, updatedPost:{title:editData.title ,content:editData.content}}));
    setEditData({id:"",title:"",content:""});
    setHidden(null);
  }

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
            <button onClick={()=> handleDelete(post.id)}>Delete</button>
            {hidden !== post.id && <button onClick={()=>handleEdit(post)}>Edit</button>}
          </div>
        ))
      ) : (
        <p> No Posts avaliable</p>
      )}
    </div>
    {editData.id && (
      <div>
        <h3>Edit Post</h3>
        <input type="text" value={editData.title}onChange={(e)=>setEditData({...editData,title:e.target.value})} placeholder="Title"/>
        <textarea value={editData.content} onChange={(e)=>setEditData({...editData,content:e.target.value})} placeholder="Content"/>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={()=>setEditData({id:"",title:"",content:""})}>Cancel</button>
      </div>
    )}
    </>
  );
};
export default Posts;
