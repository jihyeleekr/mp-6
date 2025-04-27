import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        console.error('Authorization code is missing');
        return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
    }

    try {
        const tokenResponse = await axios.post(
            'https://www.linkedin.com/oauth/v2/accessToken',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
                    client_id: process.env.LINKEDIN_CLIENT_ID,
                    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
        response.cookies.set('token', accessToken, { httpOnly: true, maxAge: 60 * 60 * 24 });

        return response;
    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
