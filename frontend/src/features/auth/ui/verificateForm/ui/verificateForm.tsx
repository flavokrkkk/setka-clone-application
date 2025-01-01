import { useVerificateMutation } from "@/entities/auth/hooks/useQueryMutate";
import { memo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import AuthWrapper from "../../authWrapper/ui/authWrapper";
import { EAuthModes } from "../../../lib/utils/mode";
import { Loader } from "@/shared/ui";

const VerificateForm = memo(() => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verificate } = useVerificateMutation();
  const hasTokenBeenUsed = useRef(false);

  useEffect(() => {
    if (token && !hasTokenBeenUsed.current) {
      verificate(token);
      hasTokenBeenUsed.current = true;
    }
  }, [token, verificate]);

  return (
    <AuthWrapper mode={EAuthModes.LOGIN}>
      <div>
        <Loader />
      </div>
    </AuthWrapper>
  );
});

export default VerificateForm;
