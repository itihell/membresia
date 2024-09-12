"use client";
import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import Link from "next/link";
import { Input } from "../input";
import { AvatarUser } from "./avatar-user";


export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);

  return (
    <nav className="bg-gradient-to-b to-blue-800 from-blue-600 border-b border-b-blue-400 h-16 flex items-center  justify-between">
      <div className="ml-2 flex w-2/12 md:w-4/12 justify-start">
        <Link href="/" className="grid grid-cols-12  w-full ">
          <span className="invisible md:visible w-36 flex items-center justify-center ">
            <span className={`${titleFont.className} text-white`}>United</span>
            <span className="font-mono ml-1 text-yellow-200">Members</span>
          </span>
          <span className="visible md:invisible  rounded-full bg-white w-10 h-10 flex items-center justify-center ">
            <span className={titleFont.className}>U</span>
            <span className="font-mono ml-1">M</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end mr-2 s w-10/12 md:w-8/12">
        <div className="w-full flex justify-end">
          <Input
            type="text"
            placeholder="Buscar..."
            className="md:w-4/12 bg-white"
          />
        </div>
        <div className="ml-3">
          <AvatarUser />
        </div>
      </div>
    </nav>
  );
};
