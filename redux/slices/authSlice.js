import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage } from '@/utils/localStorage';

export const authSlice = createSlice({
    name: 'authUser',
    initialState: {
        // userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        userInfo: getLocalStorage('userInfo') ? getLocalStorage('userInfo') : null,
        // userInfo: null,
    },
    reducers: {
        activeUser: (state, action) => {
            state.userInfo = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { activeUser } = authSlice.actions

export default authSlice.reducer