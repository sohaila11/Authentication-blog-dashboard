import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../FireBaseConfig";
import { collection, getDocs, addDoc,deleteDoc,doc, updateDoc } from "firebase/firestore";


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() ,
    createdAt:doc.data().createdAt?.toDate().toISOString(),}));
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  await addDoc(collection(db, "posts"), newPost);
});

export const deletePost = createAsyncThunk("posts/deletePost",async (postId)=>{
  await deleteDoc(doc(db,"posts",postId));
  return postId;
});

export const editPost=createAsyncThunk("posts/edit",async({postId,updatedPost})=>{
  await updateDoc(doc(db,"posts",postId),updatedPost);
  return {postId,updatedPost}
})
const postSlice = createSlice({
  name: "posts",
  initialState: {list:[]},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(deletePost.fulfilled,(state,action)=>{
      state.list=state.list.filter(post => post.id !== action.payload);
    });
    builder.addCase(editPost.fulfilled,(state,action)=>{
      const index = state.list.findIndex(post =>post.id === action.payload.postId);
      if(index !== -1){
      state.list[index]={...state.list[index],...action.payload.updatedPost};
      }
    })
  }
});

export default postSlice.reducer;
