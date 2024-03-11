import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import styles from "./LoginForm.module.scss";
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
  passwordValidation,
} from "../../utils/validation/validation";
import { useState } from "react";
import { useAppDispatch } from "../../utils/hooks/redux-hooks";
import { loginUser } from "../../redux/auth/authOperation";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<IFormValues>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    dispatch(loginUser(data));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <div className={styles.loginFormWrp}>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form
        className={styles.loginForm}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
              error={!!errors.email?.message}
              helperText={errors?.email?.message}
              defaultValue={field.value}
              autoComplete="username"
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
                error={!!errors.password?.message}
                helperText={errors?.password?.message}
                defaultValue={field.value}
                autoComplete="current-password"
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
          Login
        </Button>
      </form>
      <NavLink className={styles.navLink} to="/weather-app/registration">
        Registration
      </NavLink>
    </div>
  );
};
