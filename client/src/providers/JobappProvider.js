import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JobappContext = React.createContext();
export const JobappConsumer = JobappContext.Consumer;

const JobappProvider = ({ children }) => {
  const [jobapps, setJobapps] = useState([])
  const [totalInterviews, setTotalInterviews] = useState()
  const [uniqueInterviews, setUniqueInterviews] = useState()
  const [msgs, setMsgs] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [counts, setCounts] = useState({ applied: 0, rejected: 0, pending: 0, offer: 0, hired: 0 });
  const navigate = useNavigate()

  const getAllJobapps = (status, term, page) => {
    let url = '/api/jobapps/'

    if (status && term) {
      url = `/api/jobapps/?status=${status}&term=${term}`
    } else if (status) {
      url = `/api/jobapps/?status=${status}`
    } else if (term) {
      url =`/api/jobapps/?term=${term}`
    } 
    
    if (page) {
      setCurrentPage(page)
      url = url === '/api/jobapps/' ? url + `?page=${page}` : url + `&page=${page}`
    }
    axios.get(url)
      .then( res => {
        setJobapps(res.data.jobapps)
        setTotalPages(res.data.total_pages)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const addJobapp = (jobapp) => {
    axios.post('/api/jobapps', { jobapp })
      .then( res => setJobapps([...jobapps, res.data]))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const updateJobapp = (id, jobapp) => {
    axios.put(`/api/jobapps/${id}`, { jobapp })
      .then(res => {
        const newUpdatedJobapps = jobapps.map( ja => {
          if (ja.id === id) {
            return res.data
          }
          return ja
        })
        setJobapps(newUpdatedJobapps)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const deleteJobapp = (id) => {
    axios.delete(`/api/jobapps/${id}`)
      .then( res => setJobapps( jobapps.filter(ja => ja.id !== id)))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const getAllInterviews = () => {
    axios.get('/api/total_interview_count')
      .then( res => setTotalInterviews(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const getUniqueInterviews = () => {
    axios.get('/api/unique_interview_count')
      .then( res => setUniqueInterviews(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const getStats = () => {
    axios.get('/api/jobapp_stats')
      .then( res => {
        setCounts(res.data)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  return (
    <JobappContext.Provider value={{
      jobapps, 
      getAllJobapps,
      msgs,
      setMsgs,
      addJobapp,
      updateJobapp,
      deleteJobapp,
      getAllInterviews,
      totalInterviews,
      getUniqueInterviews,
      uniqueInterviews,
      currentPage,
      setCurrentPage,
      totalPages,
      getStats,
      counts,
    }}>
      { children }
    </JobappContext.Provider>
  )
}

export default JobappProvider;