import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { ACTION_DELAY } from '@/app/game/constants';

const dataFilePath = path.join(process.cwd(), 'src/dataBase/gameData.json');

const readGameData = () => {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    throw new Error('Error reading game data:', error);
  }
};

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, ACTION_DELAY));

  const gameData = readGameData();
  if (!gameData) {
    return NextResponse.json(
      { success: false, error: 'Failed to load game data' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, data: gameData }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    await new Promise((resolve) => setTimeout(resolve, ACTION_DELAY));

    const { score, playerName } = await req.json();

    if (!playerName || typeof score !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid input' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, message: 'Score submitted successfully!' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 },
    );
  }
}
