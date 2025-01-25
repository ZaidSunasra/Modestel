export default function ErrorMessage({ message }: { message: string | undefined }) {
    return (
        <p className="text-destructive"> {message} </p>
    );
}