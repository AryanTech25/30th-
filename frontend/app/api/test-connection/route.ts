import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'
    const response = await fetch(`${backendUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        name: 'Test',
        surname: 'User',
        email: 'test@test.com',
        password: 'Test123!@#',
        confirmPassword: 'Test123!@#'
      })
    })

    if (response.ok) {
      return NextResponse.json({ 
        status: 'success', 
        message: 'Backend connection successful',
        backendUrl 
      })
    } else {
      const errorData = await response.json()
      return NextResponse.json({ 
        status: 'error', 
        message: 'Backend responded with error',
        error: errorData,
        statusCode: response.status,
        backendUrl
      }, { status: 200 })
    }
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to connect to backend',
      error: error.message,
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'
    }, { status: 200 })
  }
}
