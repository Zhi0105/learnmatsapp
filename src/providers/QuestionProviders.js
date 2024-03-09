import React, { useEffect } from 'react'
import { QuestionContext } from '@_context/QuestionContext'
import { GetQuestions } from '@_services/question'
import useUserStore from '@_stores/auth';
import useQuestionStore from '@_stores/question';

export const QuestionProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setQuestions } = useQuestionStore((state) => ({ setQuestions: state.setQuestions }));


useEffect(() => {
    (async() => {
      if(token) {
        const questions = await GetQuestions(token)
        if(questions) {
          setQuestions(questions)
          return questions
        }
      }
    })()
  }, [token])

  return (
    <QuestionContext.Provider
      value={null}
    >
      {children}
    </QuestionContext.Provider>
  )

}