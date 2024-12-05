import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    coachs: [],
    loading: false,
    error: null,
}

const coachSlice=createSlice({
    name:"coach",
    initialState,
    reducers:{
        fetchCoachsStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        fetchCoachsSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.coachs=action.payload;
        },
        fetchCoachsFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})
export const {fetchCoachsStart,fetchCoachsSuccess,fetchCoachsFailure}=coachSlice.actions;



export const fetchAllCoachs=()=>async (dispatch)=>{
    dispatch(fetchCoachsStart());
    try {
        const res = await axios.get("http://localhost:3000/api/user/client/getCoachs", {
            withCredentials: true,
        });
        if (!res.data || res.data.length === 0) {
            throw new Error("No Coaches Found");
        }
        dispatch(fetchCoachsSuccess(res.data));
    } catch (e) {
        dispatch(fetchCoachsFailure(e.message || "An error occurred while fetching data"));
    }
}

export const searchCoachsByNom=(search)=>async (dispatch)=>{
    dispatch(fetchCoachsStart());
    try {
        const res = await axios.get(`http://localhost:3000/api/user/client/searchCoachs?search=${search}`, {
            withCredentials: true,
        });
        if (!res.data || res.data.length === 0) {
            throw new Error("No Coaches Found");
        }
        dispatch(fetchCoachsSuccess(res.data));
    } catch (e) {
        dispatch(fetchCoachsFailure(e.message || "An error occurred while fetching data"));
    }
}

export default coachSlice.reducer;