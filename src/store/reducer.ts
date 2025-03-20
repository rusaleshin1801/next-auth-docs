import { userDocsApi } from "./slices/userDocsSlice";
import { authApi } from "./slices/authApi";
import snackbarReducer from "./slices/snackbar";

const reducer = {
  [userDocsApi.reducerPath]: userDocsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  snackbar: snackbarReducer,
};

export default reducer;
