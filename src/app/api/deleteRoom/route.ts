import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(request:NextRequest) {
  try {
    const {roomId} = await request.json()
    const deleteRoom = prisma.room.delete({
      where: {id: roomId}
    })
    if (!deleteRoom) {
      throw new Error ('Could not find room to delete')
    }
    return NextResponse.json(deleteRoom, {status: 200})
  }
  catch (err) {
    return NextResponse.json({error: 'Failed to delete room', err},{ status: 500 })
  }
}
