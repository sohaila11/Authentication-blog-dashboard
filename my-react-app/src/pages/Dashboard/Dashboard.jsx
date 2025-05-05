import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {fetchInfo}  from "../../store/AuthSlice";
import { fetchPosts } from "../../store/PostSlice";
import "./Dashboard.css"

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)||[];
  const info = useSelector((state)=>state.auth.info);
  const posts = useSelector((state)=>state.posts.list)||[];
  const dispatch =useDispatch();
  
  const email=user.email;
  const notFound ="Not Found";

  useEffect(()=>{
      dispatch(fetchInfo()),
      dispatch(fetchPosts());
    },[dispatch])

  return (
    <>
      {user && <div className="Dash">
        <h2 >Personal data</h2>
        {info.filter((info)=>info.email === email).map((info,index) => (
            <div className ="post" key={info.id||index}>
            <h3 className="post-title">Name: {info?.name ?info.name: notFound }</h3>
            <p className="post-content">Designation: {info?.designation ?info.designation: notFound }</p>
            <p className="post-content">Location: {info?.location ?info.location: notFound }</p>
            <p className="post-content">About: {info?.about ?info.about: notFound }</p>
          </div>
        ))
        }
        <p>Welcome to our Community</p>
        <h3>Your History</h3>
        <div className="posts">
        {posts.length === 0 ? (
            <p>no content</p>
          ):(posts.filter((post)=>post.email === email).map((post,index) => (
              <div className="post"key={post.id||index}>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">Published at : {post.createdAt ?new Date( post.createdAt).toLocaleDateString("en-CA"):"No data avaliable"}</p>
              <p className="post-content">{post.content}</p>
            </div>
          )))}
        </div>
      </div>}
    </>
  );
};

export default Dashboard;
