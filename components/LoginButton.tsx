'use client';

export default function LoginButton() {
    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
            <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4">OAuth Demo</h1>
                <p className="text-gray-500 mb-8 text-center">Sign in with your preferred provider</p>

                <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                >
                    Sign in with LinkedIn
                </button>
            </div>
        </div>
    );
}
