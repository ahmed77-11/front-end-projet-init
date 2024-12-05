import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    exercices: [],
    loading: false,
    error: null,
};

// Slice
const exerciceSlice = createSlice({
    name: "exercice",
    initialState,
    reducers: {
        addExerciceRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addExerciceSuccess(state, action) {
            state.loading = false;
            state.exercices.push(action.payload);
        },
        addExerciceFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateExerciceRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateExerciceSuccess(state, action) {
            state.loading = false;
            state.exercices = state.exercices.map((exercice) =>
                exercice.id === action.payload.id ? action.payload : exercice
            );
        },
        updateExerciceFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getExercicesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getExercicesSuccess(state, action) {
            state.loading = false;
            state.exercices = action.payload;
        },
        getExercicesFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteExerciceRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteExerciceSuccess(state, action) {
            state.loading = false;
            state.exercices = state.exercices.filter((exercice) => exercice.id !== action.payload);
        },
        deleteExercicesFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

// Exporting actions
export const { addExerciceRequest, addExerciceSuccess, addExerciceFailed,updateExerciceRequest,updateExerciceSuccess,updateExerciceFailed,getExercicesRequest,getExercicesSuccess,getExercicesFailed ,deleteExerciceRequest,deleteExerciceSuccess,deleteExercicesFailed} = exerciceSlice.actions;

// Add Exercice with video upload
export const addExercice = (exercice, navigate) => async (dispatch) => {
    dispatch(addExerciceRequest());
    console.log("clicked")
    try {
        // Upload the video and get its URL
        const videoUrl = await uploadVideo(exercice.video) ;
        // const videoUrl ="https://res.cloudinary.com/daaal1xjh/video/upload/v1733262988/videos/bsrxrbx8lvq65wfrfuqm.mp4" ;
        // Convert the image to base64
        const imageBase64 = await convertFileToBase64(exercice.image);

        const jsonPayload = {
            nom: exercice.exerciseName,
            description: exercice.description,
            category: exercice.category,
            difficulty: exercice.difficulty,
            repetion: exercice.repetition,
            image: imageBase64,
        };

        // Sending the exercise data to the server
        const response = await axios.post(
            "http://localhost:3000/api/exercice/addExercice",
            {...jsonPayload,video:videoUrl},
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        dispatch(addExerciceSuccess(response.data));
        navigate("/dashboard");
    } catch (e) {
        console.error(e.response.data);
        dispatch(addExerciceFailed(e.message));
    }
};

// Helper function for video upload
const uploadVideo = async (videoFile) => {
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await axios.post("http://localhost:3000/api/uploadVideos", formData, {
        headers: { "Content-Type": "multipart/form-data" }
        , withCredentials: true,
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Video upload progress: ${percentCompleted}%`);
        },
    });
    console.log(response.data)
    return response.data.filePath;
};


const updateVideo=async (videoUrl,videoFile)=>{
    const formData=new FormData();
    formData.append("video",videoFile);
    formData.append("videoUrl",videoUrl);
    console.log(formData)

    const response=await axios.post("http://localhost:3000/api/updateVideo",formData,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true,
        onUploadProgress:(progressEvent)=>{
            const percentCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);
            console.log(`Video upload progress: ${percentCompleted}%`);
        }
    })
    console.log(response.data)
    return response.data.filePath;

}

export const updateExerciceData=(id,exercice,navigate)=>async (dispatch)=>{
    dispatch(updateExerciceRequest());
    try {
        let jsonPayload={...exercice};
        if(exercice.image){
            const imageBase64=await convertFileToBase64(exercice.image);
            jsonPayload.image=imageBase64;
        }
        if(exercice.video){
            console.log(exercice.videoUrl)
            const videoLink=await updateVideo(exercice.videoUrl,exercice.video);
            jsonPayload.video=videoLink;
        }else{
            jsonPayload.video=exercice.videoUrl;
        }
        console.log(jsonPayload)
        const response=await axios.patch(`http://localhost:3000/api/exercice/updateExercice/${id}`,jsonPayload,{
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        });
        dispatch(updateExerciceSuccess(response.data));
        navigate("/dashboard");
    }catch (e) {
        console.log(e)
        dispatch(updateExerciceFailed(e.message || "Update failed"));

    }
}

export const getAllExercices= ()=>async (dispatch)=>{
    dispatch(getExercicesRequest());
    try{
        const res=await axios.get("http://localhost:3000/api/exercice/getExercices",{
            withCredentials:true
        })
        if(!res.data){
            throw new Error("No data received from API");
        }
        dispatch(getExercicesSuccess(res.data));

    }catch (e) {
        console.log(e)
        dispatch(getExercicesFailed(e.message || "Fetch failed"));
    }
}

export const getMyExercices= ()=>async (dispatch)=>{
    dispatch(getExercicesRequest());
    try{
        const res=await axios.get("http://localhost:3000/api/exercice/myExercices",{
            withCredentials:true
        })
        if(!res.data){
            throw new Error("No data received from API");
        }
        dispatch(getExercicesSuccess(res.data));

    }catch (e) {
        console.log(e)
        dispatch(getExercicesFailed(e.message || "Fetch failed"));
    }
}

export const deleteExercice=(id)=>async (dispatch)=>{
    dispatch(deleteExerciceRequest());
    try{
        const res=await axios.delete(`http://localhost:3000/api/exercice/deleteExercice/${id}`,{
            withCredentials:true
        });
        console.log(res)
        dispatch(deleteExerciceSuccess(id));
    }catch (e) {
        dispatch(deleteExercicesFailed(e.message || "Delete failed"));
    }
}

// Helper function to convert image to base64
const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default exerciceSlice.reducer;
