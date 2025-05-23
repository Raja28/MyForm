import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { userPersonalInfo } from "../features/userSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const _statusLoading = "loading"
export default function PersonalInfo_Form() {
    const [update, setUpdate] = useState(false)
    const { user, status } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            _id: "",
            name: '',
            email: '',
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipcode: "",
        }

    });

    useEffect(() => {
        if (user?.personalInfo) {
            Object.keys(user?.personalInfo).forEach(key =>{
                setValue(key, user?.personalInfo[key])
            })
        }
    }, [user?.personalInfo ])

    async function handlerPersonalInfo(data) {
        // e.preventDefault(); 

        try {
            const res = await dispatch(userPersonalInfo(data)).unwrap()

            if (res?.success) {

               const updatedUser = { ...user, personalInfo: res?.personalInfo }
                sessionStorage.setItem("user", JSON.stringify(updatedUser))
                // toast.success(res?.message)
                navigate("/form/education_information")

            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    }

    return (
        <>
            <section className="container my-4">
                <div className="d-flex ">
                    <Link
                        to={-1}
                        className="border rounded-circle shadow-sm btn btn-sm p-0 my-auto" style={{ width: "1.6rem", height: "1.6rem" }}>
                        <HiOutlineArrowCircleLeft className="w-100 h-100 " />
                    </Link>
                    <h2 className="text-center w-100">
                        <div className="">Personal Information</div>
                    </h2>
                </div>
            </section>

            <section className="container my-2 " >
                <div className="row col-lg-8 col-md-10  g-3 mx-auto border rounded-3 border shadow px-2"
                >


                    <form
                    // className="row col-lg-8 col-md-10  g-3 mx-auto border rounded-3 border shadow px-2"  
                    >
                        <div className="d-flex flex-wrap flex-lg-nowrap gap-3 mb-3">
                            <div className="w-100 ">
                                <label htmlFor="name" className="form-label">Full name <sup>*</sup></label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="form-control"
                                    id="name"
                                    disabled={status === _statusLoading || (user?.personalInfo && !update)}


                                />
                                <div className="">
                                    {errors.name && <small className="text-danger">Name required</small>}
                                </div>
                            </div>
                            <div className="w-100">
                                <label htmlFor="email" className="form-label">Email<sup>*</sup></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    disabled={status === _statusLoading || (user?.personalInfo && !update)}

                                    {...register("email", { required: true })}
                                />
                                <div className="">
                                    {errors.email && <small className="text-danger">Email required</small>}
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mb-3">
                            <label htmlFor="addressLine1" className="form-label">Address 1<sup>*</sup></label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine1"
                                disabled={status === _statusLoading || (user?.personalInfo && !update)}

                                {...register("addressLine1", { required: true })}
                            />
                            <div className="">
                                {errors.addressLine1 && <small className="text-danger">Address required</small>}
                            </div>
                        </div>
                        <div className="w-100 mb-3">
                            <label htmlFor="addressLine2" className="form-label">Address 2 <small className="text-secondary">(optional)</small></label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine2"
                                disabled={status === _statusLoading || (user?.personalInfo && !update)}
                                {...register("addressLine2",)}
                            />

                        </div>
                        <div className="d-flex flex-wrap flex-lg-nowrap gap-3 mb-3">
                            <div className="w-100 ">
                                <label htmlFor="city" className="form-label">City <sup>*</sup></label>
                                <input
                                    type="text"
                                    {...register("city", { required: true })}
                                    className="form-control"
                                    disabled={status === _statusLoading || (user?.personalInfo && !update)}
                                    id="city"
                                />
                                <div className="">
                                    {errors.city && <small className="text-danger">City required</small>}
                                </div>
                            </div>
                            <div className="w-100">
                                <label htmlFor="state" className="form-label">State<sup>*</sup></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    disabled={status === _statusLoading || (user?.personalInfo && !update)}
                                    {...register("state", { required: true })}
                                />
                                <div className="">
                                    {errors.state && <small className="text-danger">State required</small>}
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mb-3">
                            <label htmlFor="zipcode" className="form-label">Zipcode<sup>*</sup></label>
                            <input
                                type="text"
                                className="form-control"
                                id="zipcode"
                                disabled={status === _statusLoading || (user?.personalInfo && !update)}
                                {...register("zipcode", { required: true })}
                            />
                            <div className="">
                                {errors.zipcode && <small className="text-danger">Zipcode required</small>}
                            </div>
                        </div>
                    </form>
                    {user?.personalInfo ? (
                        <div className=" my-2 ">
                            {
                                update ? (
                                    <div className="col-12  d-flex gap-3 w-100  justify-content-end">
                                        <button
                                            disabled={status === _statusLoading}
                                            onClick={() => setUpdate(prev => false)}
                                            className="btn btn-secondary rounded-4 float-end my-2" >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit(handlerPersonalInfo)}
                                            disabled={status === _statusLoading}
                                            className="btn btn-warning rounded-4 float-end my-2" >
                                            {status === _statusLoading ? "Saving..." : 'Save'}
                                        </button>
                                    </div>
                                )
                                    : (
                                        <div className="col-12  d-flex gap-3 w-100  justify-content-end">
                                            <button

                                                onClick={() => setUpdate(prev => true)}
                                                className="btn btn-warning float-end rounded-4 my-2"
                                                type="submit"
                                                style={{ width: "5rem" }}
                                            >
                                                Update
                                            </button>
                                            <Link

                                                to={"/form/education_information"}
                                                className="btn btn-success float-end rounded-4 my-2"
                                                type="submit"
                                                style={{ width: "5rem" }}
                                            >
                                                Next
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                    )
                        : (
                            <div className="col-12  my-4 ">
                                <button
                                    // onClick={() => setUpdate(prev => true)}
                                    onClick={handleSubmit(handlerPersonalInfo)}
                                    disabled={status === _statusLoading}
                                    className="btn btn-success float-end rounded-4 "
                                    type="submit"
                                    style={{ width: "5rem" }}
                                >
                                    Save
                                </button>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}