export const loginValidation = {
  required: "Enter your name",
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return "Name must include only latin characters";
    }

    return true;
  },
};
export const emailValidation = {
  required: "Enter your email",
  validate: (value: string) => {
    if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return "Invalid email format";
    }

    return true;
  },
};

export const passwordValidation = {
  required: "Enter your password",
  validate: (value: string) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    } else if (value.match(/[а-яА-Я]/)) {
      return "Password must include only latin characters";
    }

    return true;
  },
};
