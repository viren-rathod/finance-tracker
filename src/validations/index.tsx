import * as Yup from "yup";

export const logInSchema = Yup.object({
  email: Yup.string()
    .email("*Please enter valid Email!")
    .required("*Please enter your Email"),
  password: Yup.string()
    .min(3, "*Password must be atleast 3 character Long!")
    .required("*Please enter your password"),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(2, "*Username must be atleast 2 character Long!")
    .max(25, "*Username can be only 25 character Long!")
    .required("Please enter your username"),
  email: Yup.string()
    .email("*Please enter valid Email!")
    .required("*Please enter your Email"),
  password: Yup.string()
    .min(3, "*Password must be atleast 3 character Long!")
    .required("*Please enter your password"),
});

export const formSchema = Yup.object({
  tDate: Yup.date().required("*Please fill the Date!"),
  monthYear: Yup.string().required("*Please fill the Month year!"),
  transactionType: Yup.string().required("*Please fill the Transaction type!"),
  fromAccount: Yup.string().required("*Please fill the Frpm Account!"),
  toAccount: Yup.string().required("*Please fill the TO Account!"),
  amount: Yup.number().required("*Please fill the valid Amount!"),
  receipt: Yup.string().required("*Please Add the Receipt!"),
  notes: Yup.string().required("*Please fill the Note!"),
});
