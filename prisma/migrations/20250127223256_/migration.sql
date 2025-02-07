-- AlterTable
ALTER TABLE "_UserRooms" ADD CONSTRAINT "_UserRooms_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserRooms_AB_unique";
