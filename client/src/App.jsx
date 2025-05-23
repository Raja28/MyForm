

import { SignUpForm } from "./components/SignupForm";
import { LoginForm } from "./components/LoginForm";

import { useState } from "react";
const formLogin = "login"
const formSignup = "signup"

function App() {
  const [formType, setFormType] = useState("login")

  return (

    <section className="container d-flex justify-content-center align-items-center">
      <div className="rounded border my-5 shadow border-warning p-3" style={{ width: "30rem" }}>
        {/* Top */}
        <div className="text-center mt-2 ">
          <h2 >Welcome Back</h2>
          <div>
            <div>Signup or login to manage your</div>
            <div>application</div>
          </div>
          <div className="d-flex justify-content-center  mt-3">
            <div className={`w-100 py-2 fw-semibold ${formType === formLogin ? "border-3 text-success  border-success  border-bottom" : ""} `}
              style={{ cursor: "pointer" }}
              onClick={() => setFormType("login")}
            >
              Login
            </div>
            <div className={`w-100 py-2 fw-semibold ${formType !== "login" ? "border-3 text-success  border-success  border-bottom" : ""} `}
              style={{ cursor: "pointer" }}
              onClick={() => setFormType("signup")}
            >
              Sign Up
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="bg-light">
          <div className="mx-3 py-4">

            {
              formType === formLogin ? (<LoginForm />) : (<SignUpForm />)
            }
          </div>
        </div>
      </div>
    </section>

  )

}

export default App
