"use client";
import { useMenu } from "@/hooks";
import { useUiStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";

export const SideBar = () => {
  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeMenu = useUiStore(state => state.closeSideMenu);
  const { menu } = useMenu();

  return (
    <div>
      {/* Background (oscurece el fondo) */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          onClick={closeMenu}
        ></div>
      )}

      {/* Blur (efecto de desenfoque) */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm "
        ></div>
      )}

      {/* SideMenu (el menú en sí) */}
      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-[500px] h-screen bg-blue-500 z-20 shadow-2xl transform transition-all duration-300 flex flex-col", // Agregado flex flex-col aquí
          {
            "-translate-x-full": !isSideMenuOpen,
            "translate-x-0": isSideMenuOpen,
          }
        )}
      >
        {/* Botón de cerrar */}
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        {/* Input de busqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* --- Sección de Menú Estática Superior --- */}
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={closeMenu}
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>
        <Link
          href="/"
          className="flex items-center p-2 hover:bg-gray-100 rounded transition-all" // Quitamos mt-10 aquí para que no haya doble margen
          onClick={closeMenu}
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        <div className="w-full h-px bg-gray-200 my-10" />

        {/* --- Contenedor Scrollable para los elementos del hook `useMenu` --- */}
        <div className="flex-1 overflow-y-auto pr-2">
          {" "}
          {/* pr-2 para dejar espacio para la barra de scroll */}
          {menu.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              // Asegura que haya un margen superior si no es el primer elemento después del separador
              className={clsx(
                "flex items-center p-2 hover:bg-gray-100 rounded transition-all",
                {
                  "mt-2": index === 0, // Añade margen superior al primer elemento si lo necesitas
                  "mt-1": index > 0, // Un margen más pequeño para los siguientes elementos
                }
              )}
              onClick={closeMenu}
            >
              {item.icono}
              <span className="ml-3 text-xl">{item.name}</span>
            </Link>
          ))}
        </div>
        {/* --- Fin del Contenedor Scrollable --- */}
      </nav>
    </div>
  );
};
