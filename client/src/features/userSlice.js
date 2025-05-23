import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { USER_DELETE_PROJECT_API, USER_EDUCATION_INFO_API, USER_LOGIN_API, USER_PERSONAL_INFO_API, USER_PROJECT_INFO_API, USER_SIGNUP_API } from "../utils/api";


export const loginUser = createAsyncThunk("loginUser.posts", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(USER_LOGIN_API, data)
        return res?.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.message)
    }
})
export const signupUser = createAsyncThunk("signupUser.posts", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(USER_SIGNUP_API, data)
        return res?.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.message)
    }
})
export const userPersonalInfo = createAsyncThunk("userPersonalInfo.post", async (data, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await axios.post(USER_PERSONAL_INFO_API, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res?.data
    } catch (error) {
        console.log("Error userPersonalInfo slice", error);
        return rejectWithValue(error?.response?.data?.message)

    }
})
export const userEducationInfo = createAsyncThunk("userEducationInfo.post", async (data, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await axios.post(USER_EDUCATION_INFO_API, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res?.data
    } catch (error) {
        console.log("Error userEducationInfo slice", error);
        return rejectWithValue(error?.response?.data?.message)

    }
})
export const userProjectInfo = createAsyncThunk("userProjectInfo.post", async (data, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await axios.post(USER_PROJECT_INFO_API, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res?.data
    } catch (error) {
        console.log("Error userProjectInfo slice", error);
        return rejectWithValue(error?.response?.data?.message)

    }
})
export const userDeleteProject = createAsyncThunk("userDeleteProject.post", async (data, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await axios.post(USER_DELETE_PROJECT_API, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res?.data
    } catch (error) {
        console.log("Error userDeleteProject slice", error);
        return rejectWithValue(error?.response?.data?.message)

    }
})


const initialState = {
    user: sessionStorage.getItem("user") !== "undefined" ? JSON.parse(sessionStorage.getItem("user")) : null,
    token: sessionStorage.getItem("token") !== "undefined" ? sessionStorage.getItem("token") : null,
    status: "idle",
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearSlice: (state) => {
            state.user = null
            state.token = null
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(signupUser.fulfilled, (state, { payload }) => {
                state.user = payload.user
                state.token = payload.token
                state.status = "success"
            })
            .addCase(signupUser.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user = payload.user
                state.token = payload.token
                state.status = "success"
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
            .addCase(userPersonalInfo.pending, (state) => {
                state.status = "loading"
            })
            .addCase(userPersonalInfo.fulfilled, (state, { payload }) => {
                state.user.personalInfo = payload.personalInfo
                state.status = "success"
            })
            .addCase(userPersonalInfo.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
            .addCase(userEducationInfo.pending, (state) => {
                state.status = "loading"
            })
            .addCase(userEducationInfo.fulfilled, (state, { payload }) => {
                state.user.educationInfo = payload.educationInfo
                state.status = "success"
            })
            .addCase(userEducationInfo.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
            .addCase(userProjectInfo.pending, (state) => {
                state.status = "loading"
            })
            .addCase(userProjectInfo.fulfilled, (state, { payload }) => {
                state.user.projectsInfo = payload.projectsInfo
                
                state.status = "success"
            })
            .addCase(userProjectInfo.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
            .addCase(userDeleteProject.pending, (state) => {
                state.status = "loading"
            })
            .addCase(userDeleteProject.fulfilled, (state, { payload }) => {
                state.user.projectsInfo = payload.projectsInfo
                
                state.status = "success"
            })
            .addCase(userDeleteProject.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
    }
})
export const { clearSlice } = userSlice.actions
export default userSlice.reducer