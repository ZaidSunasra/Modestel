import LoginForm from "@/components/LoginForm";
import { LoginInputs } from "@/lib/types";
import { useLogin } from "@/mutations/authMutation";

const LoginPage = () => {

    const mutation = useLogin();

    const handleLogin = (data: LoginInputs) => {
        mutation.mutate(data);
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen font-mono text-primary bg-background">
            <div className="w-2/5 text-left mr-8">
                <h1 className="text-6xl font-bold mb-4">Modestel</h1>
                <p className="text-xl text-muted-foreground">
                    Effortlessly automate and streamline daily report entries for your desktop hotel management needs.
                </p>
            </div>
            <LoginForm onSubmit={handleLogin} isLoading={mutation.isPending} />
        </div>
    )
}

export default LoginPage;