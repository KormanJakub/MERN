import { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

const LoginPage = ({ onSelect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-column align-items-center justify-content-center gap-3 mt-8">
      <h1>LOGIN</h1>
      <FloatLabel>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">* Email</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          id="email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">* Password</label>
      </FloatLabel>

      <Button label="Login" icon="pi pi-check" />
    </div>
  );
};

export default LoginPage;
