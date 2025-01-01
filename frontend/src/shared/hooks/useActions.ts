import { authActions } from "@/entities/auth/model";
import { userActions } from "@/entities/user/model/store/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...authActions,
      ...userActions,
    },
    dispatch,
  );
};
