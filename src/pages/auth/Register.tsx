import React from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../validations";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    id: 0,
    username: "",
    email: "",
    password: "",
  };

  //Handling form submit event
  const submitHandler = (v: typeof initialValues) => {
    let allData: (typeof initialValues)[] = [];
    if (JSON.parse(localStorage.getItem("usersData") || "[]"))
      allData = JSON.parse(localStorage.getItem("usersData") || "[]");
    v.id = allData.length + 1;
    allData.push(v);
    localStorage.setItem("usersData", JSON.stringify(allData));
    alert("Register Successfully!\nNow Log In !!");
    navigate("/login");
  };

  //using formik to handle form data
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => submitHandler(values),
    });

  return (
    <div className="bg-info-subtle">
      <Form
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
        onSubmit={(event) => handleSubmit(event)}
      >
        <Form.Group className="w-50 my-1" controlId="formusername">
          <Form.Label className="fs-5 my-1">Username</Form.Label>
          <Form.Control
            className="fs-6"
            type="text"
            name="username"
            placeholder="Enter username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username ? (
            <p className="text-danger m-0">{errors.username}</p>
          ) : null}
        </Form.Group>

        <Form.Group className="w-50 my-1" controlId="formEmail">
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

        <Form.Group className="w-50 my-1" controlId="formPassword">
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
          Already have an Account ?<Link to="/login"> Login </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
