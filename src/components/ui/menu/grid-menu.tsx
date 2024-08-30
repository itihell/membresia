"use client";

import { useMenu } from "@/hooks";
import { ItemGridMenu } from "./item-grid-menu";
import Link from "next/link";

const menus = [{ title: "Asistencia" }];
const GridMenu = () => {
  const { menu } = useMenu();
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <ItemGridMenu menu={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export { GridMenu };
