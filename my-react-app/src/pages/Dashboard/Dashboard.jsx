import { useSelector,useDispatch } from "react-redux";
import { useEffect ,useState } from "react";
import {fetchInfo}  from "../../store/AuthSlice";
import { fetchPosts ,deletePost,editPost} from "../../store/PostSlice";
import "./Dashboard.css"

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)||[];
  const info = useSelector((state)=>state.auth.info)||[];
  const posts = useSelector((state)=>state.posts.list)||[];
  const dispatch =useDispatch();
  const [editData,setEditData]=useState({id:"",title:"",content:""});
  const [hidden,setHidden]=useState(null);
  
  const email=user.email;
  const notFound ="Not Found";

  useEffect(()=>{
      dispatch(fetchInfo()),
      dispatch(fetchPosts());
    },[dispatch])

  const handleDelete = (postId)=>{
      dispatch(deletePost(postId));
  }
  const handleEdit=(post)=>{
      setEditData(post);
      setHidden(post.id);
  }
    
  const handleUpdate=()=>{
      dispatch(editPost({postId:editData.id, updatedPost:{photo:editData.photo, title:editData.title ,content:editData.content}}));
      setEditData({id:"",photo:"",title:"",content:""});
      setHidden(null);
  }
    
  return (
    <>
      {user && <div className="Dash">
        <h2 >Personal data</h2>
        {info.length > 0 ?(info.filter((info)=>info.email === email).map((info,index) => (
            <div className ="post" key={info.id||index}>
            <img src={info.PersonalPhoto} alt="user Image"/>
            <h3 className="post-title">Name: {info?.name ?info.name: notFound }</h3>
            <p className="post-content">Designation: {info?.designation ?info.designation: notFound }</p>
            <p className="post-content">Location: {info?.location ?info.location: notFound }</p>
            <p className="post-content">About: {info?.about ?info.about: notFound }</p>
          </div>
        ))):(
          <p>Loading or no data found</p>
        )
        }
        <p>Welcome to our Community</p>
        <h3>Your History</h3>
        <div className="posts">
        {posts.length === 0 ? (
            <p>no content</p>
          ):(posts.filter((post)=>post.email === email).map((post,index) => (
              <div className="post"key={post.id||index}>
                <img src={post.photo} alt="user Image"/>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">Published at : {post.createdAt ?new Date( post.createdAt).toLocaleDateString("en-CA"):"No data avaliable"}</p>
              <p className="post-content">{post.content}</p>
              <button onClick={()=> handleDelete(post.id)}>Delete</button>
              {hidden !== post.id && <button onClick={()=>handleEdit(post)}>Edit</button>}
            </div>
          )))}
        </div>
      </div>
      }
      {editData.id && (
      <div>
        <h3>Edit Post</h3>
        <input type="text" value={editData.photo}onChange={(e)=>setEditData({...editData,photo:e.target.value})} placeholder="photo"/>
        <input type="text" value={editData.title}onChange={(e)=>setEditData({...editData,title:e.target.value})} placeholder="Title"/>
        <textarea value={editData.content} onChange={(e)=>setEditData({...editData,content:e.target.value})} placeholder="Content"/>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={()=>setEditData({id:"",photo:"",title:"",content:""})}>Cancel</button>
      </div>
    )}
    </>
  );
};

export default Dashboard;
