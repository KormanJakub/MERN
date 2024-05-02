import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { fetchPost } from "../util/api";

const RegisterPage = ({ onSelect }) => {
  const [nickName, setNickName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (
    pNickName,
    pFirstName,
    pLastName,
    pEmail,
    pPassword
  ) => {
    try {
      const objData = {
        nickName: pNickName,
        firstName: pFirstName,
        lastName: pLastName,
        email: pEmail,
        password: pPassword,
        password_repeat: pPassword,
      };

      const service = await fetchPost("/public/signUp", objData);

      if (service === 0) {
        console.log("User bol pridany!");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div className="flex flex-column align-items-center justify-content-center gap-3 mt-8">
      <div className="upper">
        <h1 className="pl-6">REGISTER</h1>

        <FloatLabel>
          <InputText
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            id="nickName"
          />
          <label htmlFor="nickName">* Username</label>
        </FloatLabel>
      </div>

      <div className="flex gap-4">
        <FloatLabel>
          <InputText
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="firstName">First name</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="lastName">Last name</label>
        </FloatLabel>
      </div>

      <FloatLabel>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">* Email</label>
      </FloatLabel>

      <div className="flex gap-4">
        <FloatLabel>
          <Password
            header={header}
            footer={footer}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">* Password</label>
        </FloatLabel>

        <FloatLabel>
          <Password id="confirm-password" />
          <label htmlFor="confirm-password">* Confirm your password</label>
        </FloatLabel>
      </div>
      <Button
        label="Register"
        icon="pi pi-check"
        onClick={() =>
          registerUser(nickName, firstName, lastName, email, password)
        }
      />
    </div>
  );
};

export default RegisterPage;
