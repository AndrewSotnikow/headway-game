import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/dataBase/gameData.json');

const readGameData = () => {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading game data:', error);
    return null;
  }
};

export async function GET() {
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
