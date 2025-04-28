'use client';

export default function LoginButton() {
    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    return (
        <button
            onClick={handleLogin}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
            Sign in with LinkedIn
        </button>
    );
}
