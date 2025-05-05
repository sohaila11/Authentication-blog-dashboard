import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../FireBaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() ,
    createdAt:doc.data().createdAt?.toDate().toISOString(),}));
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  await addDoc(collection(db, "posts"), newPost);
});


const postSlice = createSlice({
  name: "posts",
  initialState: {list:[]},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.list = action.payload;
    })
  }
});

export default postSlice.reducer;



