import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import styles from "./RegistrationForm.module.scss";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from "react-hook-form";
import { IFormValues } from "../../types/AuthTypes";
import {
  emailValidation,
  loginValidation,
  passwordValidation,
} from "../../utils/validation/validation";
import { useState } from "react";
import { useAppDispatch } from "../../utils/hooks/redux-hooks";
import { registrationUser } from "../../redux/auth/authOperaton";

export const RegistationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<IFormValues>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    dispatch(registrationUser(data));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <div className={styles.registrationFormWrp}>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form
        className={styles.registrationForm}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          control={control}
          name="name"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Name"
              type="name"
              variant="standard"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              // value={field.value}
              error={!!errors.name?.message}
              helperText={errors?.name?.message}
              defaultValue={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <TextField
              label="Email"
              type="email"
              variant="standard"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              // value={field.value}
              error={!!errors.email?.message}
              helperText={errors?.email?.message}
              defaultValue={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <div className={styles.passwordInputWrp}>
              <TextField
                label="Password"
                type={passwordVisibility ? "text" : "password"}
                variant="standard"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                // value={field.value}
                error={!!errors.password?.message}
                helperText={errors?.password?.message}
                defaultValue={field.value}
              />
              <div className={styles.eyeBox} onClick={togglePasswordVisibility}>
                {passwordVisibility ? (
                  <BsEye fill="#121417" />
                ) : (
                  <BsEyeSlash fill="#121417" />
                )}
              </div>
            </div>
          )}
        />

        <Button
          type="submit"
          variant="outlined"
          sx={{
            marginTop: 2,
            "&:hover": {
              color: "#000000",
            },
          }}
        >
          Register
        </Button>
      </form>
      <NavLink className={styles.navLink} to="/weather-app/login">
        Login
      </NavLink>
    </div>
  );
};
