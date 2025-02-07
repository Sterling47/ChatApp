/*
  Warnings:

  - You are about to drop the `_UserRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserRooms" DROP CONSTRAINT "_UserRooms_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRooms" DROP CONSTRAINT "_UserRooms_B_fkey";

-- DropTable
DROP TABLE "_UserRooms";

-- CreateTable
CREATE TABLE "UserRooms" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "roomID" INTEGER NOT NULL,

    CONSTRAINT "UserRooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRooms_userID_roomID_key" ON "UserRooms"("userID", "roomID");

-- AddForeignKey
ALTER TABLE "UserRooms" ADD CONSTRAINT "UserRooms_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRooms" ADD CONSTRAINT "UserRooms_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
