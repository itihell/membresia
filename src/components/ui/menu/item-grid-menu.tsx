import { Menu } from "@/interfaces";

interface Prop {
  menu: Menu;
}
export const ItemGridMenu = ({ menu }: Prop) => {
  return (
    <div>
      <div className="rounded-lg bg-gradient-to-t to-white from-gray-200 min-h-36 flex justify-center items-center transition duration-150 ease-out hover:scale-105 hover:shadow-lg">
        <div className="p-3">
          <div className="flex items-center justify-center flex-col">
            <div>{menu.icono}</div>
            <h1 className="uppercase">{menu.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
