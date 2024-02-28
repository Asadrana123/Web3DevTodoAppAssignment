import  { useState, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios";
import { TodoState } from "../context/TodoProvider";

function Login(): JSX.Element {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { userToken,setToken,setUser } = TodoState();
  const [error, setError] = useState<{ message: string } | undefined>();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("/user/login", formData);
      localStorage.setItem("authToken", JSON.stringify(result.data.token));
      console.log(result.data.token);
      setToken(result.data.token)
      console.log(JSON.stringify(result.data.token))
      setUser(result.data.user);
    } catch (error:any) {
      setError({ message: error.response.data.message });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {userToken && <Navigate to="/" />}
      <section className="login-container">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://media.istockphoto.com/id/1398587836/vector/3d-white-clipboard-task-management-todo-check-list-with-bubble-efficient-work-on-project.jpg?s=612x612&w=0&k=20&c=pj3C_kIsdBZvijBjP_wvaTDUGoK0ludHZQpUIjDm-Qo="
                className="w-full rounded-md mt-5"
                alt="Sample"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
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
                    name="email"
                    onChange={handleChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="emailInput"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="passInput"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to={"/forgotPassword"}>Forgot Password</Link>
                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-sky-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link
                      to={"/register"}
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
