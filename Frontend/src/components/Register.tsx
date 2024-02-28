import  { useState, ChangeEvent, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "../Axios/axios";
import { TodoState } from '../context/TodoProvider';


function Register(): JSX.Element {
  const [formData, setFormData] = useState<Record<string, string | undefined>>({});
  const { userToken, setToken, setUser } = TodoState();
  const [error, setError] = useState<{ message: string } | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("/user/register", formData);
      setToken(result.data.token);
      setUser(result.data);
      localStorage.setItem("authToken", JSON.stringify(result.data.token));
    } catch (error:any) {
      console.log(error);
      setError({ message: error.response.data.message });
    }
  };

  return (
    <div>
      {userToken && <Navigate to="/" />}
      <section className="register-container">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://media.istockphoto.com/id/1398587836/vector/3d-white-clipboard-task-management-todo-check-list-with-bubble-efficient-work-on-project.jpg?s=612x612&w=0&k=20&c=pj3C_kIsdBZvijBjP_wvaTDUGoK0ludHZQpUIjDm-Qo="
                className="w-full rounded-md"
                alt="Phone"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form method="post" onSubmit={handleSubmit}>
                <div>
                  {error && (
                    <div className="text-center border-2 border-green-600 p-2 mb-2 rounded-md bg-red-200 shadow-2xl">
                      {error.message}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Full name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-200 checked:border-blue-200 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                      defaultChecked
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck3"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
