import { useState } from 'react'
import { useEventsContext } from "../hooks/useEventsContext"
import { useAuthContext } from '../hooks/useAuthContext'
const EventForm = () => {
  const {dispatch}=useEventsContext()
  const {user}=useAuthContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }

    const event = {title, description, date}
    
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDescription('')
      setDate('')
      console.log('new event added:', json)
      dispatch({type:'CREATE_EVENT',payload:json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add Event</h3>

      <label>Event:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>About:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />

      <label>Timings:</label>
      <input 
        type="number" 
        onChange={(e) => setDate(e.target.value)} 
        value={date} 
      />

      <button>Set Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EventForm