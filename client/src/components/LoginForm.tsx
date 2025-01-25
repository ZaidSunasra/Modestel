import { LoginInputs } from "@/lib/types";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import ErrorMessage from "./ErrorMessage";


const LoginForm = ({ onSubmit, isLoading }: { onSubmit: (data: LoginInputs) => void, isLoading: boolean }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();

  return <>
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input
              { ...register("username", {
                required: {value: true, message: "Username cannot be empty."}
              })}
                id="username"
                placeholder="Enter your username"
              />
              <p> {errors.username && <ErrorMessage  message={errors.username.message}/>}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
              {...register("password", {
                required: {value: true, message: "Password cannot be empty."}
              })}
                id="password"
                type="password"
                placeholder="******"
              />
              <p> {errors.password && <ErrorMessage  message={errors.password.message}/>}</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>

  </>
};

export default LoginForm