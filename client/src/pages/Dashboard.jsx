
import { MdGroupAdd } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoIosList } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { clearSlice } from "../features/userSlice";


export default function Dashboard() {


    const { user } = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logouthandler() {
        sessionStorage.clear()
        dispatch(clearSlice())
        navigate("/")
    }

    return (
        <>
            <Header />

            <section className="container py-3 mt-3 ">

                <div className="row gy-3 d-flex   justify-content-center gap-3  mx-2">

                    {/* left */}
                    <div className="border col col-mg-4  shadow py-2 px-2 rounded-5 d-flex flex-column align-items-center justify-content-center"
                        style={{ maxWidth: "20rem" }}
                    >
                        <div className="w-25 rounded rounded-circle" style={{}}>
                            <img src={user?.profileImage} alt="user image" className="w-100 h-100 rounded rounded-circle" />
                        </div>
                        <div className="my-4">
                            <div className="d-flex gap-2">
                                <p>
                                    <strong>Email:</strong>
                                </p>
                                <p>{user?.email}</p>
                            </div>
                            <div className="">
                                <p
                                    onClick={logouthandler}
                                    className="btn btn-sm btn-danger w-100">
                                    Logout

                                </p>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="col-sm-12 col-md-12 col-lg-8  border rounded-5 shadow  p-4" style={{ maxWidth: "" }}>

                        <div>
                            <p className="text-secondary">Application forms: <small className="text-secondary" style={{ fontSize: "12px" }}>(Click to fill)</small></p>
                        </div>


                        <div className=" my-2 p-2 gap-3 w-100 d-flex  flex-wrap justify-content-center ">
                            <Link to={"/form/personal_information"}
                                className="rounded-4 border border-warning p-3 text-center text-secondary text-decoration-none" style={{ width: "8rem", cursor: "pointer" }}>
                                <div className="d-flex flex-column">
                                    <small>Personal</small>
                                    <small>Information</small>
                                </div>
                                <div className="w-25 mx-auto">
                                    <FaWpforms className="w-100 h-100" />
                                </div>
                            </Link>
                            <Link to={"/form/education_information"}
                                className="rounded-4 border border-warning p-3 text-center text-secondary text-decoration-none"
                                style={{ width: "8rem", cursor: "pointer" }}>
                                <div className="d-flex flex-column">
                                    <small>Educational</small>
                                    <small>Status</small>
                                </div>
                                <div className="w-25 mx-auto">
                                    <FaGraduationCap className="w-100 h-100" />
                                </div>
                            </Link>
                            <Link to={"/form/project_information"}
                                className="rounded-4 border border-warning p-3 text-center text-secondary text-decoration-none"
                                style={{ width: "8rem", cursor: "pointer" }}>
                                <div className="d-flex flex-column">
                                    <small>Project</small>
                                    <small>Work</small>
                                </div>
                                <div className="w-25 mx-auto">
                                    <BsPersonWorkspace className="w-100 h-100" />
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>


            </section>
        </>
    )
}