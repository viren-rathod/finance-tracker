import { ErrType } from "./Form";

type useValidationType = {
  setErr: React.Dispatch<React.SetStateAction<ErrType>>;
};

const useValidation = ({ setErr }: useValidationType) => {
  const validateField = (condition: boolean, errName: string, msg: string) => {
    if (condition) {
      setErr((err: ErrType) => ({
        ...err,
        [errName]: msg,
      }));
    } else {
      setErr((err: ErrType) => ({ ...err, [errName]: "" }));
      return true;
    }
    return false;
  };

  return { validateField };
};

export default useValidation;
