import { useEffect, useState } from "react"
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import { BsShieldFillCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/userSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const passwordDesc = [
    { icon: <BsShieldFillCheck />, description: "At least 8 characters" },
    { icon: <BsShieldFillCheck />, description: "At least 1 number" },
    { icon: <BsShieldFillCheck />, description: "Both upper & lower case letters" },
]
const _status = "loading"

export const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const { register, handleSubmit, formState: { errors } } = useForm()

    const { status } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function signupHandler(data) {
        const { name, email, password, confirmPassword } = data

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const resp = await dispatch(signupUser(data)).unwrap()

            if (resp?.success) {
                sessionStorage.setItem("user", JSON.stringify(resp?.user));
                sessionStorage.setItem("token", resp?.token);
                navigate("/dashboard")
            }

        } catch (error) {
            console.error("Signup failed:", error);
            const message = error || "Signup failed. Please try again.";
            toast.error(message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(signupHandler)}>
                <div className="form-floating mb-1">
                    <input
                        disabled={status === _status ? true : false}
                        type="text"
                        className="form-control"
                        {...register(
                            "name",
                            {
                                required: true

                            }
                        )}
                        placeholder="John Doe"
                    />
                    <label htmlFor="floatingInputName">Enter name</label>
                </div>
                <div className="mb-3">
                    <small className={`text-danger ${errors.name ? "d-block" : "d-none"}`}>Name required.</small>
                </div>
                <div className="form-floating mb-1">
                    <input type="email"
                        className="form-control"
                        disabled={status === _status ? true : false}
                        placeholder="name@example.com"
                        {...register(
                            "email",
                            {
                                required: true

                            }
                        )}
                    />
                    <label htmlFor="floatingInput">Email address</label>

                </div>
                <div className="mb-3">
                    <small className={`text-danger ${errors.email ? "d-block" : "d-none"}`}>Email required.</small>
                </div>
                {/* password */}
                <div className="form-floating position-relative mb-1">
                    <div className="position-absolute  z-3 end-0 top-50" style={{ transform: "translate(-1.5rem, -50%) scale(1.1)" }}
                        onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <RxEyeOpen className="text-secondary" /> : <VscEyeClosed className="text-secondary" />}
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control position-relative"
                        placeholder="Password"
                        disabled={status === _status ? true : false}
                        {...register(
                            "password",
                            {
                                required: true

                            }
                        )}
                    />
                    <label htmlFor="floatingPassword">Password</label>

                </div>
                <div className="mb-3 ">
                    <small className={`text-danger ${errors.password ? "d-block" : "d-none"}`}>Password required.</small>
                </div>
                {/* confirm-password */}
                <div className="form-floating position-relative mb-1">
                    <div className="position-absolute  z-3 end-0 top-50 " style={{ transform: "translate(-1.5rem, -50%) scale(1.1)" }}
                        onClick={() => setShowConfirmPassword(prev => !prev)}>
                        {showConfirmPassword ? <RxEyeOpen className="text-secondary" /> : <VscEyeClosed className="text-secondary" />}
                    </div>
                    <input type={showConfirmPassword ? "text" : "password"}
                        className="form-control position-relative"
                        placeholder="Confirm password"
                        disabled={status === _status ? true : false}
                        {...register(
                            "confirmPassword",
                            {
                                required: true

                            }
                        )}

                    />
                    <label htmlFor="floatingConfirmPassword">Confirm password</label>
                </div>
                <div className="mb-3 ">
                    <small className={`text-danger ${errors.confirmPassword ? "d-block" : "d-none"}`}>Confirm password required.</small>
                </div>

                <div className="mt-3 d-flex justify-content-center align-items-center">
                    <button
                        type="submit"
                        className="btn btn-warning m-0 w-75"
                        disabled={status === _status ? true : false}
                    >
                        {status === _status ? "Please wait..." : "Sign Up"}
                    </button>
                </div>
            </form>
        </>
    )
}