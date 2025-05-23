import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userDeleteProject, userProjectInfo } from "../features/userSlice";
import toast from "react-hot-toast";

const _statusLoading = "loading"
export default function ProjectsInfo_Form() {

    const { user, status } = useSelector(state => state.user)
    const [updateProjectId, setUpdateProjectId] = useState(null)
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            _id: "",
            name: "",
            description: ""
        }
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.projectsInfo && updateProjectId) {
            const selectedProject = user?.projectsInfo.find(project => project._id === updateProjectId)

            Object.keys(selectedProject).forEach(key => {
                setValue(key, selectedProject[key])
            })
        }
    }, [user?.projectsInfo, updateProjectId])


    async function projectHandler(data) {
        try {
            const res = await dispatch(userProjectInfo(data)).unwrap()

            if (res?.success) {
                const updatedUser = { ...user, projectsInfo: res?.projectsInfo }
                sessionStorage.setItem("user", JSON.stringify(updatedUser))
                reset()
                if (updateProjectId) setUpdateProjectId(null)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }

    }

    function cancelUpdateHandler() {
        setUpdateProjectId(null)
        reset()
    }

    async function deleteProject(id) {
        try {
            const res = await dispatch(userDeleteProject({ _id: id })).unwrap()

            if (res?.success) {
                const updatedUser = { ...user, projectsInfo: res?.projectsInfo }
                sessionStorage.setItem("user", JSON.stringify(updatedUser))
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    function submithandler(){
        toast.success("Application submitted")
        navigate("/dashboard")
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
                        <div className="">Projects</div>
                    </h2>
                </div>
            </section>

            <section className="container my-2 " >
                <div className="row col-lg-8 col-md-10  g-3 mx-auto border rounded-3 border shadow px-2">
                    <form
                    // onSubmit={handleSubmit(saveNewProjectHandler)}
                    >

                        <div className="w-100 ">
                            <label htmlFor="name" className="form-label">Name <sup>*</sup></label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="form-control"
                                id="name"
                                disabled={status === _statusLoading}


                            />
                            <div className="mb-3">
                                {errors.name && <small className="text-danger">Project name required</small>}
                            </div>
                        </div>
                        <div className="w-100 mb-3">
                            <label htmlFor="description" className="form-label">Description<sup>*</sup></label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="description"
                                disabled={status === _statusLoading}

                                {...register("description", { required: true })}
                            />
                            <div className="">
                                {errors.description && <small className="text-danger">Project description required</small>}
                            </div>
                        </div>
                    </form>
                    <div>
                        {
                            updateProjectId ? (
                                <div className="d-flex gap-3 justify-content-end my-3">
                                    <button
                                        onClick={cancelUpdateHandler}
                                        disabled={status === _statusLoading}
                                        className="btn btn-secondary rounded-4 ">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit(projectHandler)}
                                        disabled={status === _statusLoading}
                                        className="btn btn-success rounded-4 ">
                                        {status === _statusLoading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSubmit(projectHandler)}
                                        disabled={status === _statusLoading}
                                        style={{ width: "8rem" }}
                                        className="btn btn-success my-3 float-end col-12 rounded-4 ">
                                        Add Project
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
            {
                user?.projectsInfo && <section className="container my-5">

                    <div className="row col-lg-8 col-md-10  g-3 mx-auto border rounded-3 border px-2 py-3">

                        <h4 className="my-3">Project List : {user?.projectsInfo?.length}</h4>

                        <div className="row">
                            {
                                user?.projectsInfo?.map((project, index) => (
                                    <div key={project._id} className="col-lg-6 my-2" >
                                        <div className={`card border shadow border-warning`}>
                                            <div className="card-body">
                                                <div>
                                                    <strong>Name: </strong>
                                                    {project.name}
                                                </div>
                                                <div>
                                                    <strong>Description: </strong>
                                                    {project.description.split(" ").length > 4 ? project.description.split(" ").slice(0, 4).join(" ") + "..."
                                                        : project.description}
                                                </div>
                                                <div className="d-flex gap-2 justify-content-end my-2">
                                                    <button
                                                        disabled={status === _statusLoading || updateProjectId === project._id}
                                                        onClick={() => deleteProject(project._id)}
                                                        className="btn btn-sm btn-danger rounded-4 ">
                                                        Delete
                                                    </button>
                                                    {
                                                        project._id === updateProjectId ? (
                                                            <button
                                                                disabled={status === _statusLoading}
                                                                onClick={cancelUpdateHandler}
                                                                className="btn btn-sm btn-warning rounded-4 "
                                                            >
                                                                Cancel
                                                            </button>
                                                        ) : (<button
                                                            disabled={status === _statusLoading}
                                                            onClick={() => setUpdateProjectId(project._id)}
                                                            className="btn btn-sm btn-warning rounded-4 "
                                                        >
                                                            Update
                                                        </button>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </section>
            }

            <section className="container">
                <div className=" my-5 rounded-4 my-2 row col-lg-8 col-md-10  mx-auto">
                <hr className=" " />
                    <button 
                    disabled={status === _statusLoading || updateProjectId || !user?.projectsInfo}
                    className="btn btn-success float-end" 
                    onClick={submithandler}>
                        Submit
                    </button>
                </div>
            </section>
        </>
    )
}