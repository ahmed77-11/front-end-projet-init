import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";



const initialState = {
    current:null,
    error:null,
    loading:false,
    role:null
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        //signIn client
        signInStart:(state)=>{
            state.loading = true;
        },
        signInSuccess:(state,action)=>{
            state.current = action.payload;
            state.loading = false;
            state.error = null;
            state.role="CLIENT";
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        //signIn Coach
        signInCoachStart:(state)=>{
            state.loading = true;
        },
        signInCoachSuccess:(state,action)=>{
            state.current = action.payload;
            state.loading = false;
            state.error = null;
            state.role="COACH";
        },
        signInCoachFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        //signIn Admin
        signInAdminStart:(state)=>{
            state.loading = true;
        },
        signInAdminSuccess:(state,action)=>{
            state.current = action.payload;
            state.loading = false;
            state.error = null;
            state.role="ADMIN";
        },
        signInAdminFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        //signUp Client
        signUpStart:(state)=>{
            state.loading = true;
        },
        signUpSuccess:(state,action)=>{
            state.current = action.payload;
            state.loading = false;
            state.error = null;
            state.role="CLIENT";
        },
        signUpFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        //signUp Coach
        signUpCoachStart:(state)=>{
            state.loading = true;
        },
        signUpCoachSuccess:(state,action)=>{
            state.current = action.payload;
            state.loading = false;
            state.error = null;
            state.role="COACH";
        },
        signUpCoachFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        //update coach data
        updateCoachDataStart:(state)=>{
            state.loading=true;
        },
        updateCoachDataSuccess:(state,action)=>{
            state.current=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateCoachDataFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        //update client Data
        updateClientDataStart:(state)=>{
            state.loading=true;
        },
        updateClientDataSuccess:(state,action)=>{
            state.current=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateClientDataFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        //follow coach
        followCoachStart(state){
            state.loading=true;
        },
        followCoachSuccess(state,action){
            state.current.client.coachId=action.payload;
            state.loading=false;
            state.error=null;
        },
        followCoachFailure(state,action){
            state.error=action.payload;
            state.loading=false;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure,signUpStart,signUpSuccess,signUpFailure,signUpCoachSuccess,signUpCoachStart,signUpCoachFailure,signInCoachFailure,signInCoachStart,signInCoachSuccess,signInAdminFailure,signInAdminStart,signInAdminSuccess,updateCoachDataStart,updateCoachDataSuccess,updateCoachDataFailure,updateClientDataStart,updateClientDataFailure,updateClientDataSuccess,followCoachStart,followCoachSuccess,followCoachFailure} = userSlice.actions;

export const signUpClient = (userData) => async (dispatch) => {
    dispatch(signUpStart());
    let {pods,taille}=userData;
    pods=parseInt(pods);
    taille=parseInt(taille);
    userData={...userData,pods,taille};
    try {
        const response = await axios.post("http://localhost:3000/api/auth/signupclient", userData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        });
        dispatch(signUpSuccess(response.data)); // Handle the response data (e.g., token, user info)
    } catch (error) {
        dispatch(signUpFailure(error.response?.data?.message || "Sign-up failed"));
    }
};
export const loginClient = (userData,navigate)=>async  (dispatch)=>{
    dispatch(signInStart());
    try {

        const response = await axios.post("http://localhost:3000/api/auth/signinClient", userData, {
            headers: {
                "Content-Type": "application/json",
            },withCredentials:true
        });
        dispatch(signInSuccess(response.data));
        navigate("/dashboard")// Handle the response data (e.g., token, user info)
    } catch (error) {
        dispatch(signInFailure(error.response?.data?.message || "Sign-in failed"));
    }

};
export const signUpCoach=(userData,navigate)=>async (dispatch)=>{
    dispatch(signUpCoachStart());
    try {
        const jsonPayload={
            ...userData,
            cv:await convertFileToBase64(userData.cv),
            diplome:await convertFileToBase64(userData.diplome)
        }
        const response = await axios.post("http://localhost:3000/api/auth/signupcoach", JSON.stringify(jsonPayload), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        });
        dispatch(signUpCoachSuccess(response.data)); // Handle the response data (e.g., token, user info)
        navigate("/verifyEmail");


    }catch (error){
        console.log(error)
        dispatch(signUpCoachFailure(error.response?.data?.message || "Sign-up failed"));
    }
}
export const loginCoach=(userData,navigate)=>async (dispatch)=>{
    dispatch(signInCoachStart());
    try {
        const response = await axios.post("http://localhost:3000/api/auth/signinCoach", userData, {
            headers: {
                "Content-Type": "application/json",
            },withCredentials:true
        });
        dispatch(signInCoachSuccess(response.data));
        navigate("/dashboard")// Handle the response data (e.g., token, user info)
    } catch (error) {
        dispatch(signInCoachFailure(error.response?.data?.message || "Sign-in failed"));
    }
}
export const loginAdmin=(userData,navigate)=>async (dispatch)=>{
    dispatch(signInAdminStart());
    try {
        const response = await axios.post("http://localhost:3000/api/auth/signinAdmin", userData, {
            headers: {
                "Content-Type": "application/json",
            },withCredentials:true
        });
        dispatch(signInAdminSuccess(response.data));
        navigate("/dashboard")// Handle the response data (e.g., token, user info)
    } catch (error) {
        dispatch(signInAdminFailure(error.response?.data?.message || "Sign-in failed"));
    }
}

export const updateCoachData= (coachData,navigate)=>async (dispatch)=>{
    dispatch(updateCoachDataStart());
    try{
        let jsonPayload={...coachData}
        if(coachData.photo){
            jsonPayload={...coachData,photo:await convertFileToBase64(coachData.photo)}
        }
        if(coachData.cv){
            jsonPayload={...coachData,cv:await convertFileToBase64(coachData.cv)}
        }
        if(coachData.diplome){
            jsonPayload={...coachData,diplome:await convertFileToBase64(coachData.diplome)}
        }
        const response = await axios.patch("http://localhost:3000/api/user/coach/updateCoach", JSON.stringify(jsonPayload), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        });
        dispatch(updateCoachDataSuccess(response.data));
        navigate("/coach/dashboard/")// Handle the response data (e.g., token, user info);
    }catch (error){
        console.log(error)
        dispatch(updateCoachDataFailure(error.response?.data?.message || "Update failed"));
    }

}

export const updateClientData= (clientData,navigate)=>async (dispatch)=>{
    dispatch(updateClientDataStart());
    try{
        let jsonPayload={...clientData}
        if(clientData.photo){
            jsonPayload={...clientData,photo:await convertFileToBase64(clientData.photo)}
        }
        const response = await axios.patch("http://localhost:3000/api/user/client/updateClient", JSON.stringify(jsonPayload), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        });
        dispatch(updateClientDataSuccess(response.data));
        navigate("/client/dashboard/")// Handle the response data (e.g., token, user info);
    }catch (error){
        console.log(error)
        dispatch(updateClientDataFailure(error.response?.data?.message || "Update failed"));
    }
}

export const followCoach= (id)=>async (dispatch)=>{
    try{
        dispatch(followCoachStart());
        const res=await axios.get("http://localhost:3000/api/follow/followCoach/"+id, {withCredentials:true});
        if(!res.data){
            throw new Error("No data Found");
        }
        dispatch(followCoachSuccess(id));
    }catch (e){
        console.error(e);
        dispatch(followCoachFailure(e.message || "An error occurred while fetching data"));
        toast.error(e.message || "An error occurred while fetching data")

    }
}

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


export default userSlice.reducer;