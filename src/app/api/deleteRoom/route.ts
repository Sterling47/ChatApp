import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { roomId } = await request.json();
    const deleteRoom = await prisma.room.delete({
      where: { id: roomId },
    });
    return NextResponse.json(deleteRoom, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete room', err }, { status: 500 });
  }
}
