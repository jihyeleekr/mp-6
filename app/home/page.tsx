import { cookies } from 'next/headers';
import axios from 'axios';
import LogoutButton from '@/components/LogOut';
import { redirect } from 'next/navigation';

export default async function HomePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return redirect('/api/auth/login');
    }

    try {
        const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const user = {
            id: userInfoResponse.data.sub,
            name: userInfoResponse.data.name,
            email: userInfoResponse.data.email,
            picture: userInfoResponse.data.picture || '',
        };

        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
                <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-6">Your Information</h1>

                    {user.picture && (
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                    )}

                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Name: {user.name}</h2>
                        <p className="text-gray-700">ID: {user.id}</p>
                        <p className="text-gray-700">Email: {user.email}</p>
                        <p className="text-gray-500 mt-2 text-sm">Signed in with: LinkedIn</p>
                    </div>

                    <div className="mt-6 w-full flex justify-center">
                        <LogoutButton />
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        return (
            <main className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-600">Error loading profile</h1>
            </main>
        );
    }
}
