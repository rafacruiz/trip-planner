
import { BackButton } from "../components/ui";
import { SignupForm } from "../components/users";

function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="mb-6 flex items-center">
                    <BackButton />
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Create your account
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Start planning your next adventure ✈️
                    </p>
                </div>

                <SignupForm/>

            </div>
        </div>
    );
}

export default SignupPage;