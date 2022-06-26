import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from './Reducers/HomeReducer'
import CartReducer from './Reducers/CartReducer'
import ModalReducer from './Reducers/Modal'
const store = configureStore({
  reducer: {
    HomeReducer,
    CartReducer,
    ModalReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;