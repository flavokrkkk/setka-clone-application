import { useMutation } from "@tanstack/react-query";
import { userService } from "../libs";
import { useActions } from "@/shared/hooks/useActions";

export const useUserMutation = () => {
  const { setCurrentUser } = useActions();

  const { mutate: getCurrentUser, isPending } = useMutation({
    mutationKey: ["get-user"],
    mutationFn: () => userService.getUserProfile(),
    onSuccess(data) {
      if (data.error) {
        console.error(new Error(data.message));
      } else {
        setCurrentUser(data.data);
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  return { getCurrentUser, isPending };
};
