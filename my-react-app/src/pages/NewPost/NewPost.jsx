import {addPost} from "../../store/PostSlice";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

const NewPost = () => {
  const[photo,setPhoto]=useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const email = user.email;

  const handleCreatePost = () => {
    if (!title || !content) return alert("Title and content are required!");
    dispatch(addPost({photo,email,title,content,createdAt:serverTimestamp()}))
    .then(()=>{
      setTitle("");
      setContent("");
      setPhoto("");
      alert("Post added successfully!");
      navigate("/posts");
    }).catch(error=>alert("Error adding post:"+error.message));
  };
  return (
    <div className="New">
      <h2>Create Your own Post</h2>
      <input
        type="text"
        placeholder="photo"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea className="tarea"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Publish</button>
    </div>
  );
};
export default NewPost;
