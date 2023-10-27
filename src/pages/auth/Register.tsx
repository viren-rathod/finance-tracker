import React from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../validations";
import { addUser } from "../../Store/slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useDispatch } from "react-redux";

export interface RegisterType {
  id: number;
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: RegisterType = {
    id: 0,
    username: "",
    email: "",
    password: "",
  };

  //Handling form submit event
  let allData = useSelector((state: RootState) => state.user.user);
  const submitHandler = (v: RegisterType) => {
    console.log(allData);
    v.id = allData.length + 1;
    dispatch(addUser(v));
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
        {/* <Button
          variant="primary"
          className="my-3 px-4 py-2 w-0 fs-6"
          type="submit"
        >
          Submit
        </Button> */}
        <button type="submit" className="custom-btn btn-save my-3 px-4">
          Submit
        </button>
        <p>
          Already have an Account ?<Link to="/login"> Login </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
