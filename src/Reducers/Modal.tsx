import { createSlice } from "@reduxjs/toolkit";

export type Modal={
open:boolean,
message:string|null
}
const initialState:Modal={
    open:false,
   message:null
}
const Modal=createSlice({
    name:"modal",
    initialState,
    reducers:{
        toggle(state,action){
            state.open=!state.open;
            
            if(action.payload!==null)
            state.message=action.payload;
        }
    }
})

export const{toggle}=Modal.actions;
export default Modal.reducer;