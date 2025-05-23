import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";

import { loginUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";


const _status = "loading"
export const LoginForm = () => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const { status } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()


    async function loginHandler(data) {

        try {
            const resp = await dispatch(loginUser(data)).unwrap()

            if (resp?.success) {
                sessionStorage.setItem("token", resp?.token)
                sessionStorage.setItem("user", JSON.stringify(resp?.user))
                navigate("/dashboard");
            } else {
                toast.error(resp?.message || "Login failed");
            }
        } catch (error) {
            console.log("Error login:=>", error);
            const message = error || "Login failed. Please try again.";
            toast.error(message);
        }

    }

    return (
        <section>
            <form onSubmit={handleSubmit(loginHandler)}>
                <div className="form-floating ">
                    <input
                        className="form-control"
                        {...register(
                            "email",
                            {
                                required: true
                            }
                        )}

                        placeholder="name@example.com"
                        disabled={status === _status ? true : false}

                    />
                    <label htmlFor="floatingInput">Email address</label>
                    <div className="mb-3 ">
                        <small className={`text-danger ${errors.email ? "d-block" : "d-none"}`}>Email required.</small>
                    </div>
                </div>

                <div className="form-floating position-relative">
                    <div className="position-absolute  z-3 end-0 top-50" style={{ transform: "translate(-1.5rem, -50%) scale(1.1)" }}
                        onClick={() => setPasswordVisible(prev => !prev)}>
                        {passwordVisible ? <RxEyeOpen className="text-secondary" /> : <VscEyeClosed className="text-secondary" />}
                    </div>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control position-relative"
                        {...register(
                            "password",
                            {
                                required: true
                            }
                        )}

                        placeholder="Password"
                        disabled={status === _status ? true : false}
                    />
                    <label htmlFor="floatingPassword">Password</label>

                </div>
                <div className="mb-3 ">
                    <small className={`text-danger ${errors.password ? "d-block" : "d-none"}`}>Password required.</small>
                </div>
                <div className="mt-3 d-flex flex-column gap-3 justify-content-center align-items-center">
                    <button
                        type="submit"
                        className="btn btn-warning m-0 w-75"
                        disabled={status === _status ? true : false}
                    >
                        {status === _status ? "Please wait..." : "Login"}
                    </button>
                    <button
                        type="button"
                        onClick={()=>loginHandler({email: "rajadavid03@gmail.com", password: "1234"})}
                        className="btn btn-warning m-0 w-75"
                        disabled={status === _status ? true : false}
                    >
                        {status === _status ? "Please wait..." : "Guest Login"}
                    </button>
                </div>
               
            </form>
        </section>
    )
}