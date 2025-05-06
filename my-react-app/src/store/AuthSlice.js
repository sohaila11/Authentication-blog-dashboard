import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../FireBaseConfig";
import { collection, getDocs} from "firebase/firestore";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  token: sessionStorage.getItem("token") || null,
  info:[],
};
export const fetchInfo = createAsyncThunk("posts/fetchInfo", async () => {
  const snapshot = await getDocs(collection(db, "info"));
  return snapshot.docs.map((doc)=>({...doc.data()}))
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.info=null;
      sessionStorage.clear();
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.info = action.payload; 
    });
  },
  }
);

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
