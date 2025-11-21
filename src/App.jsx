import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert('Backend not running! Start: cd backend && npm start');
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ name: '', phone: '', email: '' });
      fetchContacts();
    } catch (err) {
      alert('Failed to add contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Contact Book Lite</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <h2>Add New Contact</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ padding: '10px', margin: '5px', width: '220px' }}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          style={{ padding: '10px', margin: '5px', width: '220px' }}
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ padding: '10px', margin: '5px', width: '250px' }}
        />

        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Add Contact
        </button>
      </form>

      <h2>Contact List ({contacts.length})</h2>

      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {contacts.map((c) => (
            <div
              key={c._id}
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{c.name}</h3>

              <p style={{ margin: '5px 0', color: '#555' }}>
                 <strong>{c.phone}</strong>
              </p>

              <p style={{ margin: '5px 0', color: '#555' }}>
                <strong>{c.email}</strong>
              </p>

              <button
                onClick={() => handleDelete(c._id)}
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '12px',
                  width: '100%',
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
