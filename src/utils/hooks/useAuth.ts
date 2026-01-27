import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch, setUserInfo, setUserId, setMustChangePassword, setMasterKey
} from '@/store'
import appConfig from '@/configs/app.config'
import {REDIRECT_URL_KEY} from '@/constants/app.constant'
import {useNavigate} from 'react-router-dom'
import {SignInCredential, SignUpCredential} from '@/@types/auth'
import {AuthService} from "@/services/auth/auth.service";
import {parseJwt} from '@/utils/jwt'
import { buildUserKeyPayload, unwrapMasterKey } from '@/utils/crypto'
import type { UserKeyPayload } from '@/utils/crypto'
import useQuery from './useQuery'

type Status = 'success' | 'failed'

function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    token,
    signedIn,
    mustChangePassword
  } = useAppSelector((state) => state.auth.session)
  const userId = useAppSelector(state => state.auth.userInfo.userId)
  const query = useQuery()

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
    status: Status
    message: string
  }
    | undefined
  > => {
    try {
      const resp = await AuthService.signIn(values.email, values.password)
      const accessToken = resp.access_token || resp.accessToken || resp.token
      if (!accessToken) {
        return {
          status: 'failed',
          message: 'Missing access token from login response'
        }
      }

      const jwtPayload = parseJwt(accessToken) || {}
      const expireTime =
        resp.expireTime ||
        resp.expires_in ||
        (jwtPayload as any).exp ||
        0
      const refreshToken = resp.refreshToken || resp.refresh_token || ''
      const mustChangePasswordFlag = Boolean(resp.must_change_password)
      dispatch(signInSuccess({
        token: accessToken,
        refreshToken: refreshToken,
        expireTime: expireTime,
        mustChangePassword: mustChangePasswordFlag
      }))

      if (mustChangePasswordFlag) {
        navigate('/change-password')
        return {
          status: 'success',
          message: 'Must change password'
        }
      }

      const userKey: UserKeyPayload | null =
        resp.user_key?.wrappedMasterKey &&
        resp.user_key?.kdfSalt &&
        resp.user_key?.kdfParams?.algorithm &&
        resp.user_key?.kdfParams?.memory &&
        resp.user_key?.kdfParams?.iterations &&
        resp.user_key?.kdfParams?.parallelism &&
        resp.user_key?.kdfParams?.hashLength
          ? {
            wrappedMasterKey: resp.user_key.wrappedMasterKey,
            kdfSalt: resp.user_key.kdfSalt,
            kdfParams: {
              algorithm: resp.user_key.kdfParams.algorithm,
              memory: resp.user_key.kdfParams.memory,
              iterations: resp.user_key.kdfParams.iterations,
              parallelism: resp.user_key.kdfParams.parallelism,
              hashLength: resp.user_key.kdfParams.hashLength,
            },
            keyVersion: resp.user_key.keyVersion ?? 1,
          }
          : null

      if (userKey) {
        try {
          const masterKey = await unwrapMasterKey(values.password, userKey)
          dispatch(setMasterKey(masterKey))
        } catch (error) {
          console.error('Failed to unwrap master key', error)
        }
      }

      const me = await AuthService.getMe()
      const authority = me.role ? [me.role] : []
      dispatch(setUserId(me.id))
      dispatch(
        setUser(
          {
            fullName: '',
            email: me.email,
            role: authority,
          }
        )
      )
      const redirectUrl = query.get(REDIRECT_URL_KEY)
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
      return {
        status: 'success',
        message: ''
      }
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const signUp = async (values: SignUpCredential) => {
    // try {
    //   await AuthService.signUp(values)
    //   return {
    //     status: 'success',
    //     message: ''
    //   }
    //   // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    // } catch (errors: any) {
    //   return {
    //     status: 'failed',
    //     message: errors?.response?.data?.description || errors.toString()
    //   }
    // }
  }

  const handleSignOut = () => {
    dispatch(signOutSuccess())
    dispatch(setUserInfo({
      googleLogin: false,
      name: '',
      role: '',
      email: '',
      userId: userId
    }))
    dispatch(
      setUser({
        fullName: '',
        role: [],
        email: ''
      })
    )
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    // await apiSignOut()
    handleSignOut()
  }

  const changePassword = async (newPassword: string): Promise<{ status: Status; message: string }> => {
    try {
      const userKey = await buildUserKeyPayload(newPassword)
      const result = await AuthService.changePassword(newPassword, userKey)
      if (!result?.updated) {
        return {
          status: 'failed',
          message: 'Password update failed'
        }
      }
      handleSignOut()
      return {
        status: 'success',
        message: ''
      }
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors?.response?.data?.description || errors.toString()
      }
    }
  }

  return {
    authenticated: token && signedIn && !mustChangePassword,
    mustChangePassword,
    signIn,
    signUp,
    signOut,
    changePassword,
  }
}

export default useAuth
