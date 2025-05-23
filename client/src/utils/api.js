const BASE_URL = import.meta.env.VITE_BASE_URL


export const USER_SIGNUP_API = BASE_URL + "/auth/signup"
export const USER_LOGIN_API = BASE_URL + "/auth/login"


export const USER_PERSONAL_INFO_API = BASE_URL + "/user/personal_info"
export const USER_EDUCATION_INFO_API = BASE_URL + "/user/education_info"
export const USER_PROJECT_INFO_API = BASE_URL + "/user/project_info"
export const USER_DELETE_PROJECT_API = BASE_URL + "/user/project_delete"