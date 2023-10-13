import React, { useState, useEffect } from 'react';
import './style.css'; 

function App() {
  const [users, setUsers] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '' });
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    // Fetch and show users from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleAddContact = () => {
    // Simulate adding a new contact
    const updatedUsers = [...users, newContact];
    setUsers(updatedUsers);
    setNewContact({ name: '', email: '' });
  };

  const handleEditContact = () => {
    // Simulate updating a contact
    const updatedUsers = [...users];
    const index = updatedUsers.findIndex((user) => user.id === editContact.id);
    if (index !== -1) {
      updatedUsers[index] = editContact;
      setUsers(updatedUsers);
      setEditContact(null);
    }
  };

  const handleDeleteContact = (id) => {
    // Simulate deleting a contact
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <h1>Contact List</h1>
      <div>
        <h2>Add a Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
      <div>
        <h2>Contacts</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => setEditContact(user)}>Edit</button>
              <button onClick={() => handleDeleteContact(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {editContact && (
        <div>
          <h2>Edit Contact</h2>
          <input
            type="text"
            placeholder="Name"
            value={editContact.name}
            onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={editContact.email}
            onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
          />
          <button onClick={handleEditContact}>Save</button>
          <button onClick={() => setEditContact(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
