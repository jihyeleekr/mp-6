import { NextResponse } from 'next/server';

export async function GET() {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_BASE_URL}/api/auth/callback&scope=openid%20profile%20email`;
    console.log("Login URL:", authUrl); // add this to see full URL
    return NextResponse.redirect(authUrl);
}
