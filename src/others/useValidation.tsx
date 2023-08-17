const useValidation = ({ setErr }: any) => {
  const validateField = (condition: boolean, errName: string, msg: string) => {
    if (condition) {
      setErr((err: any) => ({
        ...err,
        [errName]: msg,
      }));
    } else {
      setErr(
        (err: {
          tDate: string;
          monthYear: string;
          transactionType: string;
          fromAccount: string;
          toAccount: string;
          amount: string;
          receipt: string;
          notes: string;
          user: string;
        }) => ({ ...err, [errName]: "" })
      );
      return true;
    }
    return false;
  };

  return { validateField };
};

export default useValidation;
