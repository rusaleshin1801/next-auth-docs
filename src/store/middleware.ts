import { userDocsApi } from "./slices/userDocsSlice";
import { authApi } from "./slices/authApi";

const middleware = [userDocsApi.middleware, authApi.middleware];

export default middleware;
