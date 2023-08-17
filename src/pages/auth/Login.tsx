import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logInSchema } from "../../validations";
import Modals from "../../others/Modal";
import { danger } from "../../utils/icons";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  // const [showModal, setShowModal] = useState(false);

  //Handling form submit event
  const submitHandler = (v: typeof initialValues) => {
    const allData = JSON.parse(localStorage.getItem("usersData") || "[]");
    const currentUser: (typeof initialValues)[] = allData?.filter(
      (user: typeof initialValues) =>
        user.email === v?.email && user.password === v?.password
    );
    if (currentUser?.length > 0) {
      localStorage.setItem("activeUser", JSON.stringify(currentUser[0]));
      navigate("/home");
    } else {
      // setShowModal(true);
      alert("Invalid Creds!!");
    }
  };

  //using formik to handle form data
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: logInSchema,
      onSubmit: (values, action) => submitHandler(values),
    });

  return (
    <div className="bg-info-subtle">
      <Form
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
        onSubmit={(event) => handleSubmit(event)}
      >
        <Form.Group className="w-50" controlId="formEmail">
          <Form.Label className="fs-5 my-1">E - mail</Form.Label>
          <Form.Control
            className="fs-6"
            type="text"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className="text-danger m-0">{errors.email}</p>
          ) : null}
        </Form.Group>

        <Form.Group className="w-50" controlId="formPassword">
          <Form.Label className="fs-5 my-1">Password</Form.Label>
          <Form.Control
            className="fs-6"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className="text-danger m-0">{errors.password}</p>
          ) : null}
        </Form.Group>
        <Button
          variant="primary"
          className="my-3 px-4 py-2 w-0 fs-6"
          type="submit"
        >
          Submit
        </Button>
        <p>
          Need an Account ?<Link to="/register"> Register </Link>
        </p>
      </Form>
      {/* <Modals
        setShowModal={setShowModal}
        showModal={showModal}
        title={"Sign in Failed!"}
        icon={danger}
        message={"Invalid Username or Password\nPlease try later!!"}
        onClick={() => setShowModal(false)}
        YesBtn={"Ok"}
        NoBtn={null}
      /> */}
    </div>
  );
};

export default Login;
