import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getRegistrationData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const registrationData = await getRegistrationData(request);
  
  const exists = await userService.findUserByEmail(registrationData.email)
  if (exists.length) {
    render("registrationError.eta")
  } else {
    const[passes, errors] = await validasaur.validate(
      registrationData,
      registrationValidationRules,
    );
  
    if(!passes){
      console.log(errors);
      registrationData.validationErrors = errors;
  
      render("registration.eta",  registrationData );
    } else {
      const pw = registrationData.password
      await userService.addUser(registrationData.email,false,await bcrypt.hash(pw));
      response.redirect("/auth/login");
    };
  };
    
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };