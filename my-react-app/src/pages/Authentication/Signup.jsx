import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../../FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Authentication.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation,setDesignation]=useState("");
  const[location,setLocation]=useState("");
  const [about,setAbout]=useState("");
  const[name,setName]=useState("");
  const[PersonalPhoto,setPersonalPhoto]=useState("")
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const success =await createUserWithEmailAndPassword(auth, email, password);
      {success && await addDoc(collection(db, "info"), {
            email,
            name,
            designation,
            location,
            about,
            PersonalPhoto
          });}
          alert("Signup successfully!");
          navigate("/login");
        } catch (error) {
          alert("error adding post:" + error.message);
        }
  };

  return (
    <div className="main">
      <h2>Signup</h2>
      <input placeholder="Username" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="Designation"
        type="text"
        onChange={(e) => setDesignation(e.target.value)}
      />
      <input 
      placeholder="Location"
      type="text"
      onChange={(e)=>setLocation(e.target.value)}
      />
      <input
      placeholder="Personal photo"
      type="text"
      onChange={(e)=>setPersonalPhoto(e.target.value)}
      />
      <textarea className="tarea"
        placeholder="Content"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      <button onClick={() => navigate("/")}>back</button>
    </div>
  );
};

export default Signup;
