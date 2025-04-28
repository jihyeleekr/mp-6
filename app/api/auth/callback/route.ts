import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');

        if (!code) {
            console.error('Authorization code missing');
            return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
        }

        const tokenResponse = await axios.post(
            'https://www.linkedin.com/oauth/v2/accessToken',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
                client_id: process.env.LINKEDIN_CLIENT_ID!,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',  
                },
            }
        );

        const { access_token } = tokenResponse.data;

        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
        response.cookies.set('token', access_token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });

        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error('OAuth callback Axios error:', error.response?.data || error.message);
        } else {
            console.error('OAuth callback unknown error:', error);
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
