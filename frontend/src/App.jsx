import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const API_URL = import.meta.env.API_URL || 'http://localhost:3000/contacts'
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({ name: '', phone: '' })

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}`)
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}`, formData)
      setFormData({ name: '', phone: '' })
      fetchContacts()
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
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
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <button type="submit">Add Contact</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
