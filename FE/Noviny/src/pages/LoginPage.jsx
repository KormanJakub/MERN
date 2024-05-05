import { useState } from "react";
import { Form } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form method="post" action="/login">
      <div className="flex flex-column align-items-center justify-content-center gap-3 mt-8">
        <h1>LOGIN</h1>
        <FloatLabel>
          <InputText
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">* Email</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="email">* Password</label>
        </FloatLabel>

        <Button label="Login" icon="pi pi-check" />
      </div>
    </Form>
  );
};

export default LoginPage;
