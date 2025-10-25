
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: [],
    data: {}
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state, action) => { 
            console.log(action)
            state.types = [...state.types, action.payload.type]; 
            state.data = {
                ...state.data,
                [action.payload.type]: action.payload.data
            }; 
        },
        closeModal: (state, action) => { 
            state.types = state.types.filter((type) => action.payload.type !== type); 
            // Удаляем данные модалки по ключу
            console.log('CloseModal')
            const newData = {...state.data};
            delete newData[action.payload.type];
            state.data = newData;
        },
        closeAllModal: (state) => { 
            state.types = initialState.types;
            state.data = initialState.data;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //     (action) => {
    //         return action.type === 'timetable/addAction'
    //     },
    //     (state, action) => {
    //         console.log('Current state:', {
    //             types: [...state.types],
    //             data: {...state.data}
    //         });
    //         console.log(action)
    //     //    openModal()
    //     }
    //     );
    // }
});
export default modalsSlice.reducer

// export const { setErrorNetwork, clearErrorNetwork } = errorNetworkSlice.actions
// export const selectErrorNetworks = state => state.errorNetworkReducer
// const { actions, reducer } = modalsSlice;

// export default reducer;
export const selectModalState = state => state.modalReducer;
export const {openModal,closeModal,closeAllModal} = modalsSlice.actions;