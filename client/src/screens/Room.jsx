import React, { useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'

const Room = () => {
    const socket = useSocket();

    useEffect(() => {}, []);

  return (
    <div>Room</div>
  )
}

export default Room