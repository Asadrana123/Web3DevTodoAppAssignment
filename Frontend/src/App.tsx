import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Active from './components/Active';
import Completed from './components/Completed';
import AllTask from './components/AllTask';
import Layout from './components/Layout';
import Header from './components/Header/Header';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import { TodoState } from './context/TodoProvider';

function App(): JSX.Element {
  const { userToken } = TodoState();
  return (
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            path="/"
            element={userToken ? <Layout /> : <Login />}
          >
            <Route index element={<AllTask />} />
            <Route path="active" element={<Active />} />
            <Route path="completed" element={<Completed />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
  );
}

export default App;
