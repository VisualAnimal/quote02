import React, { useEffect, useRef, useState } from 'react'
import Followed from '../components/Followed'
import UserList from '../components/UserList'
import axios from 'axios'
const User = () => {
  const [users, setUsers] = useState([])
  const usersRef = useRef()

  useEffect(() => {
    usersRef.current = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    usersRef.current()
  }, [])

  return (
    <div>
      <Followed />
      <UserList users={users} />
    </div>
  )
}

export default User