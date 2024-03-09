import React, { useEffect } from 'react'
import { AnswerContext } from '@_context/AnswerContext'
import { GetAnswers } from '@_services/answer';
import useUserStore from '@_stores/auth';
import useAnswerStore from '@_stores/answer';

export const AnswerProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setAnswers } = useAnswerStore((state) => ({ setAnswers: state.setAnswers }));

  useEffect(() => {
    (async() => {
      if(token) {
        const answers = await GetAnswers(token)
        if(answers) {
          setAnswers(answers)
          return answers
        }
      }
    })()
  }, [token])

  return (
    <AnswerContext.Provider
      value={null}
    >
      {children}
    </AnswerContext.Provider>
  )
}