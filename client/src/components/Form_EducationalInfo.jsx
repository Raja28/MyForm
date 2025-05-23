import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userEducationInfo } from "../features/userSlice";
import toast from "react-hot-toast";


const _statusLoading = "loading"
export default function EducationalInfo_Form() {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, status } = useSelector(state => state.user)

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            _id: "",
            isStudying: '',
            institutionName: '',
        }
    });

    useEffect(() => {
        if (user?.educationInfo) {
            Object.keys(user?.educationInfo).forEach(key => {
                setValue(key, user?.educationInfo[key])
            })
        }
    }, [user?.educationInfo])


    async function handlerEducationalInfo(data) {
        try {
            const res = await dispatch(userEducationInfo(data)).unwrap()

            if (res?.success) {
                const updatedUser = { ...user, educationInfo: res?.educationInfo }
                sessionStorage.setItem("user", JSON.stringify(updatedUser))
                navigate("/form/project_information")
            }
        } catch (error) {
            console.log(error);

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
                        <div className="">Educational Status</div>
                    </h2>
                </div>
            </section>
            <section className="container my-2" >
                <div className="row col-lg-8 col-md-10  g-3 mx-auto border rounded-2  px-2 shadow">
                    <form
                        onSubmit={handleSubmit(handlerEducationalInfo)}>

                        <div className="mb-0  d-flex justify-content-between flex-wrap flex-lg-nowrap flex-md-nowrap">
                            <div className=" mt-2">
                                <label htmlFor="">Are you still studying ?</label>
                            </div>

                            <div className=" d-flex  mx-auto px-2 gap-5 mt-2">
                                <div className="form-check">
                                    <input
                                        {...register("isStudying", { required: true })}
                                        className="form-check-input"
                                        type="radio"
                                        value="yes"
                                        id="radioDefault1"
                                        disabled={status === _statusLoading || (user?.educationInfo && !update)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <label className="form-check-label" htmlFor="radioDefault1">
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        {...register("isStudying", { required: true })}
                                        className="form-check-input"
                                        type="radio"
                                        value="no"
                                        id="radioDefault2"
                                        disabled={status === _statusLoading || (user?.educationInfo && !update)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <label className="form-check-label " htmlFor="radioDefault2">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-1 mb-3">
                            {errors.isStudying && <small className="text-danger">Please select your education status</small>}
                        </div>
                        {
                            watch("isStudying") === "yes" && (
                                <>
                                    <div className="">
                                        <label htmlFor="institution" className="form-label">Where are you studying ?</label>
                                        <input
                                            {...register("institutionName", { required: true })}
                                            type="text"
                                            disabled={status === _statusLoading || (user?.educationInfo && !update)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className=" mt-1 mb-3">
                                        {errors.institutionName && <small className="text-danger">Please enter institution details</small>}
                                    </div>
                                </>
                            )

                        }
                        {/* <div className="col-12">
                            {
                                user?.educationInfo ? (
                                    update ? (
                                        <div>
                                            <button
                                                disabled={status === _statusLoading}
                                                onClick={() => setUpdate(prev => false)}
                                                className="btn btn-secondary rounded-4 float-end"
                                            >
                                                Cancel

                                            </button>
                                            <button
                                                disabled={status === _statusLoading}
                                                // 
                                                className="btn btn-warning rounded-4 float-end"
                                            >
                                                {status === _statusLoading ? "Saving..." : 'Save'}

                                            </button>
                                        </div>
                                    ) :
                                        (
                                            <div
                                                onClick={() => setUpdate(prev => true)}
                                                className="btn btn-warning rounded-4">
                                                Update
                                            </div>
                                        )
                                ) : (
                                    <div className="col-12  my-4">
                                        <button
                                            disabled={status === _statusLoading}
                                            className="btn btn-success float-end rounded-4 mb-3"
                                            style={{ width: "5rem" }}
                                            type="submit"
                                        >
                                            {status === _statusLoading ? "Saving..." : 'Save'}
                                        </button>
                                    </div>

                                )
                            }

                        </div> */}
                    </form>
                    {user?.educationInfo ? (
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
                                            onClick={handleSubmit(handlerEducationalInfo)}
                                            disabled={status === _statusLoading}
                                            className="btn btn-warning rounded-4 float-end my-2" >
                                            {status === _statusLoading ? "Saving..." : 'Save'}
                                        </button>
                                    </div>
                                )
                                    : (
                                        <>
                                            <div className="col-12  d-flex gap-3 w-100  justify-content-end">
                                                <button
                                                    disabled={status === _statusLoading}
                                                    onClick={() => setUpdate(prev => true)}
                                                    className="btn btn-success float-end rounded-4 my-2"
                                                    type="submit"
                                                    style={{ width: "5rem" }}
                                                >
                                                    Update
                                                </button>
                                                <Link

                                                    to={"/form/project_information"}
                                                    className="btn btn-success float-end rounded-4 my-2"
                                                    type="submit"
                                                    style={{ width: "5rem" }}
                                                >
                                                    Next
                                                </Link>
                                            </div>

                                        </>
                                    )
                            }
                        </div>
                    )
                        : (
                            <div className="col-12  my-4 ">
                                <button

                                    onClick={handleSubmit(handlerEducationalInfo)}
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
            </section >
        </>
    )
}