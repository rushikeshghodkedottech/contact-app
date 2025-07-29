import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({ name: '', phone: '' })

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contacts')
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/contacts', formData)
      setFormData({ name: '', phone: '' })
      fetchContacts()
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`)
      fetchContacts()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return (
    <div className="app">
      <h1>Contact Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <button type="submit">Add Contact</button>
      </form>

      <div className="contacts-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <div>
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
            </div>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
