import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.Config';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
   
   const navigate = useNavigate();



   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const { login } = useAuth(); //Get the login function from context

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setError('');

      try {
         const response = await api.post("/auth/login", { email, password });
         //Backend should set the HttpOnly cookie.
         //The response.data should contain the user object (id, username, email, role)
         //because we're returning it from the backend login endpoint.
         console.log('Login successful');
         console.log(response.data);
         login(response.data);
         navigate('/dannyhome/transfer');
      } catch (error: any) {
         console.error('Login error: ', error);
         if (error.response.data.message) {
            setError(error.response.data.message);
         }
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <h2>Login</h2>
         {error && <p>error</p>}
         <fieldset>
            <div>
               <label htmlFor="emai">Email:</label>
               <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div>
               <label htmlFor="password">Password:</label>
               <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            
            <button type="submit">Login</button>
         </fieldset>
      </form>
   )

}

export default LoginForm;