import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { hashPasswordSync, verifyPassword } from '@/utils/password';

const users = [
  {
    id: uuidv4(),
    name: 'Dida Patria',
    username: 'didapatria',
    email: 'didapatria3@gmail.com',
    password: hashPasswordSync('Dida@2025!'),
  },
];

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = users.find((u) => u.username === username);

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username or password',
        },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      data: safeUser,
      message: 'Login successful',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
