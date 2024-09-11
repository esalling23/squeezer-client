// import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
  return axios({
    method: 'POST',
    url: '/auth/sign-up/',
    data: {
			email: credentials.email,
			password: credentials.password,
			password_confirmation: credentials.passwordConfirmation
    }
  })
}

export const signIn = (credentials) => {
  return axios({
    url: '/auth/sign-in/',
    method: 'POST',
    data: {
			email: credentials.email,
			password: credentials.password
    }
  })
}

export const signOut = (user) => {
  return axios({
    url: '/auth/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: '/auth/change-password/',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
			old: passwords.oldPassword,
			new: passwords.newPassword
    }
  })
}
