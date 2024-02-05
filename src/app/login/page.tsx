// CLIENT
"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
// import login from '../../../Pages/api/login'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', password: '' });

  const handlenameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, name: e.target.value }));
  };

  const handlepasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, password: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data.user);
        // You can handle success actions here, like redirecting to a dashboard
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
        // You can handle error actions here, like displaying an error message
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input style={{ color: 'black' }} type="text" value={formData.name} onChange={handlenameChange} />
        </label>
        <br />
        <label>
          Password:
          <input style={{ color: 'black' }} type="password" value={formData.password} onChange={handlepasswordChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
