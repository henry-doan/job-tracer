import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InterviewContext = React.createContext();
export const InterviewConsumer = InterviewContext.Consumer;

const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([])
  const [msgs, setMsgs] = useState()
  const navigate = useNavigate()

  const getAllInterviews = (jobappId) => {
    axios.get(`/api/jobapps/${jobappId}/interviews`)
      .then( res => setInterviews(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const addInterview = (jobappId, interview) => {
    axios.post(`/api/jobapps/${jobappId}/interviews`, { interview })
      .then( res => setInterviews([...interviews, res.data]))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const updateInterview = (jobappId, id, interview) => {
    axios.put(`/api/jobapps/${jobappId}/interviews/${id}`, { interview })
      .then(res => {
        const newUpdatedInterviews = interviews.map( p => {
          if (p.id === id) {
            return res.data
          }
          return p
        })
        setInterviews(newUpdatedInterviews)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const deleteInterview = (jobappId, id) => {
    axios.delete(`/api/jobapps/${jobappId}/interviews/${id}`)
      .then( res => setInterviews( interviews.filter(p => p.id !== id)))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  return (
    <InterviewContext.Provider value={{
      interviews, 
      getAllInterviews,
      msgs,
      setMsgs,
      addInterview,
      updateInterview,
      deleteInterview,
    }}>
      { children }
    </InterviewContext.Provider>
  )
}

export default InterviewProvider;