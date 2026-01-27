import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SLICE_BASE_NAME} from './constants'

export interface SessionState {
  signedIn: boolean
  token: string | null
  expireTime: number
  refreshToken: string | null;
  mustChangePassword: boolean
  masterKey: string | null
}

const initialState: SessionState = {
  signedIn: false,
  token:null,
  expireTime: 0,
  refreshToken: null,
  mustChangePassword: false,
  masterKey: null,
}

const sessionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/session`,
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<{ token: string, expireTime: number, refreshToken: string, mustChangePassword?: boolean }>) {
      state.signedIn = true
      state.token = action.payload.token
      state.expireTime = action.payload.expireTime
      state.refreshToken = action.payload.refreshToken
      state.mustChangePassword = Boolean(action.payload.mustChangePassword)
    },
    signOutSuccess(state) {
      state.signedIn = false
      state.token = null
      state.refreshToken = null
      state.expireTime = -1
      state.mustChangePassword = false
      state.masterKey = null
    },
    updateSession(state, action: PayloadAction<{ token: string, expireTime: number, refreshToken: string }>) {
      // state.signedIn = true
      state.token = action.payload.token
      state.expireTime = action.payload.expireTime
      state.refreshToken = action.payload.refreshToken
    },
    setMustChangePassword(state, action: PayloadAction<boolean>) {
      state.mustChangePassword = action.payload
    },
    setMasterKey(state, action: PayloadAction<string | null>) {
      state.masterKey = action.payload
    },
  },
})

export const {signInSuccess, signOutSuccess,updateSession, setMustChangePassword, setMasterKey} = sessionSlice.actions
export default sessionSlice.reducer
