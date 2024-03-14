import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@_context/AuthContext';
import { Login, GetUser, Register } from '@_services/authentications';
import useUserStore from '@_stores/auth';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import _ from 'lodash'

import useClasslevelStore from '@_stores/classlevel';
import useMaterialStore from '@_stores/material';
import useQuestionStore from '@_stores/question';
import useAnswerStore from '@_stores/answer';
import useLanguageStore from '@_stores/language';
import useTranslationStore from '@_stores/translation';

export const AuthProviders = ({ children }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { setUser, setToken, setUserLogout } = useUserStore((state) => ({
    setUser: state.setUser,
    setToken: state.setToken,
    setUserLogout: state.setUserLogout
  }));


  const { mutate: handleLoginUser, isLoading: loginLoading } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['login'] });
        showMessage({
          message: "Login success",
          type: 'success',
          duration: 1000,
          floating: true,
          position: 'top',
        })
        authenticate(data.access_token)
      }, 
    onError: (err) => {  
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 1000,
        floating: true,
        position: 'top',
      })
    },
  });

  const { mutate: handleRegister, isLoading: registerLoading } = useMutation({
    mutationFn: Register,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['register'] });
        showMessage({
          message: "New user created",
          type: 'success',
          duration: 1000,
          floating: true,
          position: 'top',
        })
        authenticate(data.access_token)
      }, 
    onError: (err) => {  
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 1000,
        floating: true,
        position: 'top',
      })
    },
  });

  const { resetClasslevels} = useClasslevelStore((state) => ({ resetClasslevels: state.resetClasslevels }));
  const { resetMaterials } = useMaterialStore((state) => ({ resetMaterials: state.resetMaterials }));
  const { resetQuestions} = useQuestionStore((state) => ({ resetQuestions: state.resetQuestions }));
  const { resetAnswers} = useAnswerStore((state) => ({ resetAnswers: state.resetAnswers }));
  const { resetLanguages} = useLanguageStore((state) => ({ resetLanguages: state.resetLanguages }));
  const { resetTranslations} = useTranslationStore((state) => ({ resetTranslations: state.resetTranslations }));

  const logout_debounce = _.debounce(() => {
    resetClasslevels()
    resetMaterials()
    resetQuestions()
    resetAnswers()
    resetLanguages()
    resetTranslations()
  }, 1000)
  

  const register = (data) => {
    handleRegister(data)
  }

  const login = (data) => {
    handleLoginUser(data)
  }

  const authenticate = async(user) => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Account' }],
    });
    const userdetails = await GetUser(user)
    userdetails && setUser(userdetails)
    setToken(user)
  }

  const logout = () => {
    setUserLogout()
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    showMessage({
      message: "Logout success",
      type: 'success',
      duration: 1000,
      floating: true,
      position: 'top',
    })
    logout_debounce()
  }

  
  return (
    <AuthContext.Provider
      value={{
        register: (data) => { register(data) },
        login: (data) => { login(data) },
        authenticate: (user) => { authenticate(user) },
        logout: () => { logout() },
        loginLoading: loginLoading,
        registerLoading: registerLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
