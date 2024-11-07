import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSocket} from '../context/SocketProvider';
import './css/lobby.css'

const Lobby = () => {

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();
  

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    // console.log({email, room});
    socket.emit("room:join", { email, room });
  }, [email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data
    navigate(`/room/${room}`);
  }, [navigate]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    }
  }, [socket, handleJoinRoom]);

  return (
    <div className="container">
      <h1>Lobby</h1>

      <form onSubmit={handleSubmitForm}>
        <div className="innerinput">
          <label htmlFor='email'>Email ID</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        </div>
        <div className="innerinput">
        <label htmlFor='room'>Room Number</label>
        <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} /> <br />
        </div>
        <button>Join</button>
      </form>
    </div>
  )
}

export default Lobby