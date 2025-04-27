import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function HomePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
            <h1 className="text-4xl font-bold mb-4">OAuth Demo</h1>
            <p className="text-gray-600 mb-8">Sign in with your preferred provider</p>

            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-md flex flex-col gap-6 items-center w-full max-w-sm">
                <Link
                    href="/api/auth/login"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Sign in with LinkedIn
                </Link>
            </div>
        </main>
    );
}
