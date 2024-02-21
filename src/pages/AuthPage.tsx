import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { HOME_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../services/authService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const intl = useIntl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseData = await fetchLogin(email, password);

    if (!responseData) {
      setError(
        "There has been a problem with the login endpoint, please try again later"
      );
      return;
    }

    if (
      signIn({
        auth: {
          token: responseData.token,
          type: "Bearer",
        },
        userState: responseData.userInfo,
      })
    ) {
      navigate(HOME_ROUTE);
    } else {
      setError("Login is invalid");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -translate-y-28 gap-4">
      <h1 className="text-4xl text-primary ">
        {intl.formatMessage({ id: "login" })}
      </h1>

      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {intl.formatMessage({ id: "email" })}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="border border-solid"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {intl.formatMessage({ id: "password" })}
            </Label>
            <Input
              id="password"
              type="password"
              className="border border-solid"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button className="w-full" type="submit">
              {intl.formatMessage({ id: "login" })}
            </Button>
          </div>
        </div>
      </form>

      {error && (
        <div className="text-2xl mt-3" style={{ color: "#ee3A44" }}>
          {error}
        </div>
      )}
    </div>
  );
}
