import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import form from "react-bootstrap/Form";
import { accounts, months, transactionTypes } from "../utils/Constants";
import { file, rupee } from "../utils/icons";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import useValidation from "./useValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTransaction } from "../Store/slices/financeSlice";
export interface transaction {
  transactionType: string;
  amount: string;
  key: number;
  monthYear: string;
  receipt: string;
  toAccount: string;
  user: string;
  fromAccount: string;
  tDate: string;
  notes: string;
}
const Form = () => {
  //
  const user = localStorage.getItem("activeUser");
  const userEmail: string = JSON.parse(user || "{}").email;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id || null;

  const initialValues = {
    tDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    notes: "",
    user: userEmail,
    key: parseInt(""),
  };

  const [err, setErr] = useState(initialValues);
  const { validateField } = useValidation({ setErr });
  const dispatch = useDispatch();
  const { transactions } = useSelector((state: any) => state.finance);

  let currentUser: transaction = initialValues;
  const checkMode = () => {
    if (id) {
      const allData = transactions;
      currentUser =
        allData.find((user: typeof initialValues) => user.key === id) ??
        initialValues;
    }
  };

  useEffect(() => {
    checkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkMode()]);

  let { values, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: id ? currentUser : initialValues,
    validationSchema: "",
    onSubmit: () => {
      const isFormValid = checkFormData(values);
      if (isFormValid) {
        submitHandler(values);
      }
    },
  });

  const checkFormData = (values: any) => {
    const tDate = validateField(
      values.tDate.length === 0,
      "tDate",
      "Please select Transaction Date!"
    );

    const monthYear = validateField(
      values.monthYear.length === 0,
      "monthYear",
      "Please select Month & Year!"
    );

    const transactionType = validateField(
      values.transactionType.length === 0,
      "transactionType",
      "Please select Transaction Type!"
    );

    const fromAccount = validateField(
      values.fromAccount.length === 0,
      "fromAccount",
      "Please select Account!"
    );

    const toAccount = validateField(
      values.toAccount.length === 0,
      "toAccount",
      "Please select Account!"
    );

    const amount = validateField(
      values.amount.length === 0,
      "amount",
      "Please select an Amount!"
    );

    const receipt = validateField(
      values.receipt.length === 0,
      "receipt",
      "Please select Receipt!"
    );

    const notes = validateField(
      values.notes.length === 0,
      "notes",
      "Please write a Note!"
    );

    if (
      monthYear &&
      tDate &&
      receipt &&
      transactionType &&
      fromAccount &&
      tDate &&
      toAccount &&
      amount &&
      notes
    )
      return true;
    return false;
  };

  const handleReceipt = (e: any) => {
    const file = e.target.files[0];
    if (
      !(
        file.type.includes("png") ||
        file.type.includes("jpg") ||
        file.type.includes("jpeg")
      )
    ) {
      setErr((err) => ({
        ...err,
        receipt: "Type invalid, Only png,jpg and jpeg allowed",
      }));
    } else {
      getBase64(file).then((base64: any) => {
        values.receipt = base64;
      });
    }
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (values: typeof initialValues) => {
    /* Form Submit */
    const uniqueId = new Date().getTime();
    let allData: (typeof newTransaction)[] = [];
    allData = transactions;
    let newTransaction = { ...values, key: uniqueId };
    if (id) {
      allData = allData.map((data) => {
        if (data.key === parseInt(id)) {
          return { ...newTransaction, key: data.key };
        }
        return data;
      });
      dispatch(setTransaction([...allData]));
    } else {
      dispatch(setTransaction([newTransaction, ...allData]));
    }
    navigate("/home");
  };

  return (
    <div className="bg-body-secondary" style={{ height: "100vh" }}>
      <div className="main container">
        <div className="form-div w-50 my-0 mx-auto">
          <h1 className="text-center">Add Transaction</h1>

          <form onSubmit={handleSubmit}>
            {/* Transaction Date */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback className="d-block" type="invalid">
                {values.tDate.length !== 0 ? "" : err.tDate}
              </form.Control.Feedback>
              <FloatingLabel
                label="Transaction Date"
                className=" shadow-sm rounded"
              >
                <form.Control
                  className={
                    touched.tDate
                      ? values.tDate.length !== 0
                        ? "is-valid "
                        : "is-invalid "
                      : values.tDate.length !== 0
                      ? "is-valid "
                      : ""
                  }
                  type="date"
                  name="tDate"
                  id="tDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tDate}
                />
              </FloatingLabel>
            </div>

            {/* Month Year */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.monthYear.length !== 0 ? "" : err.monthYear}
              </form.Control.Feedback>
              <FloatingLabel
                label="Month Year"
                className="mb-4 shadow-sm rounded"
              >
                <form.Select
                  className={
                    touched.monthYear
                      ? values.monthYear.length !== 0
                        ? "is-valid form-select"
                        : "is-invalid form-select"
                      : values.monthYear.length !== 0
                      ? "is-valid form-select"
                      : "form-select"
                  }
                  name="monthYear"
                  id="monthYear"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.monthYear || "DEFAULT"}
                >
                  <option value="DEFAULT" disabled hidden={true}>
                    Select Month Year
                  </option>
                  {months.map((item) => {
                    return (
                      <option key={item.id} value={item.label}>
                        {item.label}
                      </option>
                    );
                  })}
                </form.Select>
              </FloatingLabel>
            </div>

            {/* Transaction Type */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.transactionType.length !== 0 ? "" : err.transactionType}
              </form.Control.Feedback>
              <FloatingLabel
                label="Transaction Type"
                className="mb-4 shadow-sm rounded"
              >
                <form.Select
                  name="transactionType"
                  className={
                    touched.transactionType
                      ? values.transactionType.length !== 0
                        ? "is-valid form-select"
                        : "is-invalid form-select"
                      : values.transactionType.length !== 0
                      ? "is-valid form-select"
                      : "form-select"
                  }
                  id="transactionType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.transactionType || "DEFAULT"}
                >
                  <option value="DEFAULT" disabled hidden={true}>
                    Select Transaction Type
                  </option>
                  {transactionTypes.map((item) => {
                    return (
                      <option key={item.id} value={item.label}>
                        {item.label}
                      </option>
                    );
                  })}
                </form.Select>
              </FloatingLabel>
            </div>

            {/* From Account  */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.fromAccount.length !== 0 ? "" : err.fromAccount}
              </form.Control.Feedback>
              <FloatingLabel
                label="From Account"
                className="mb-4 shadow-sm rounded"
              >
                <form.Select
                  name="fromAccount"
                  className={
                    touched.fromAccount
                      ? values.fromAccount.length !== 0
                        ? "is-valid form-select"
                        : "is-invalid form-select"
                      : values.fromAccount.length !== 0
                      ? "is-valid form-select"
                      : "form-select"
                  }
                  id="fromAccount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.fromAccount || "DEFAULT"}
                >
                  <option value="DEFAULT" disabled hidden={true}>
                    Select From
                  </option>
                  {accounts
                    .filter((i) => i.label !== values.toAccount)
                    .map((item) => {
                      return (
                        <option key={item.id} value={item.label}>
                          {item.label}
                        </option>
                      );
                    })}
                </form.Select>
              </FloatingLabel>
            </div>

            {/* To Account  */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.toAccount.length !== 0 ? "" : err.toAccount}
              </form.Control.Feedback>
              <FloatingLabel
                label="To Account"
                className="mb-4 shadow-sm rounded"
              >
                <form.Select
                  name="toAccount"
                  className={
                    touched.toAccount
                      ? values.toAccount.length !== 0
                        ? "is-valid form-select"
                        : "is-invalid form-select"
                      : values.toAccount.length !== 0
                      ? "is-valid form-select"
                      : "form-select"
                  }
                  id="toAccount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.toAccount || "DEFAULT"}
                >
                  <option value="DEFAULT" disabled hidden={true}>
                    Select To
                  </option>
                  {accounts
                    .filter((i) => i.label !== values.fromAccount)
                    .map((item) => {
                      return (
                        <option key={item.id} value={item.label}>
                          {item.label}
                        </option>
                      );
                    })}
                </form.Select>
              </FloatingLabel>
            </div>

            {/* Amount */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.amount.length !== 0 ? "" : err.amount}
              </form.Control.Feedback>
              <div
                className={
                  (touched.amount
                    ? values.amount.length !== 0
                      ? "is-valid "
                      : "is-invalid "
                    : values.amount.length !== 0
                    ? "is-valid "
                    : " ") +
                  "d-flex justify-content-center align-items-center form-control p-0 mb-4 shadow-sm rounded"
                }
              >
                <span className="border-end p-3">{rupee}</span>
                <span className="w-100">
                  <FloatingLabel label="Amount">
                    <form.Control
                      type="number"
                      placeholder="Amount"
                      className={
                        (touched.amount
                          ? values.amount.length !== 0
                            ? "is-valid "
                            : "is-invalid "
                          : values.amount.length !== 0
                          ? "is-valid "
                          : "") + " border-0"
                      }
                      id="amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="amount"
                      defaultValue={values.amount}
                    />
                  </FloatingLabel>
                </span>
              </div>
            </div>

            {/* Receipt */}
            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.receipt.length !== 0 ? "" : err.receipt}
              </form.Control.Feedback>
              <div
                className={
                  (touched.receipt
                    ? values.receipt.length !== 0
                      ? "is-valid "
                      : "is-invalid "
                    : values.receipt.length !== 0
                    ? "is-valid "
                    : " ") +
                  "d-flex justify-content-center align-items-center form-control p-0 mb-4 shadow-sm rounded"
                }
              >
                <span className="border-end p-3">{file}</span>
                <span className="w-100">
                  <form.Control
                    type="file"
                    placeholder="Receipt"
                    className={
                      (touched.receipt
                        ? values.receipt.length !== 0
                          ? "is-valid "
                          : "is-invalid "
                        : values.receipt.length !== 0
                        ? "is-valid "
                        : " ") + " border-0 p-3"
                    }
                    id="receipt"
                    name="receipt"
                    onChange={handleReceipt}
                    onBlur={handleBlur}
                  />
                </span>
              </div>
            </div>

            <div className="mb-4 mt-3">
              <form.Control.Feedback type="invalid" className="d-block">
                {values.notes.length !== 0 ? "" : err.notes}
              </form.Control.Feedback>
              <FloatingLabel label="Notes" className="mb-4 shadow-sm rounded">
                <form.Control
                  as="textarea"
                  placeholder="Add Note here..."
                  style={{ height: "50px" }}
                  name="notes"
                  id="notes"
                  className={
                    touched.notes
                      ? values.notes.length !== 0
                        ? "is-valid "
                        : "is-invalid "
                      : values.notes.length !== 0
                      ? "is-valid "
                      : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.notes}
                />
              </FloatingLabel>
            </div>

            <Button variant="primary" type="submit">
              {id ? "Update" : "Add"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
