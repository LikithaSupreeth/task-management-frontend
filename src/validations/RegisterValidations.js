import * as Yup from "yup";

const registrationValidations = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters long"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters long"),

  email: Yup.string()
    .email("Invalid email address")
    .required("email address is required"),

  password: Yup.string()
    .required("password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9]).*$/, 'Password needs uppercase, symbol, & number.'),
  role: Yup.string()
    .required("role is required")
    .oneOf(["Employee", "TeamLead"], "Invalid role selected"),
});

export default registrationValidations