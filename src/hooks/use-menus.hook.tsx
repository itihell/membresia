import {
  FaBagShopping,
  FaCalendarCheck,
  FaChurch,
  FaListCheck,
  FaMoneyBill1Wave,
  FaPeopleCarryBox,
  FaPeopleGroup,
  FaPeopleLine,
  FaPerson,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa6";
import { Menu } from "@/interfaces";
import { useState } from "react";

const useMenu = () => {
  const [menu, setMenu] = useState<Menu[]>([
    { name: "Personas", path: "/personas", icono: <FaUsers size={40} /> },
    {
      name: "Asistencia",
      path: "/asistencias",
      icono: <FaListCheck size={40} />,
    },
    {
      name: "Membresia",
      path: "/membresias",
      icono: <FaUserCheck size={40} />,
    },
    { name: "Eventos", path: "/eventos", icono: <FaCalendarCheck size={40} /> },
    { name: "Iglesia", path: "/iglesias", icono: <FaChurch size={40} /> },
    { name: "Familias", path: "/familias", icono: <FaPeopleGroup size={40} /> },
    {
      name: "Donaciones",
      path: "/donacion",
      icono: <FaPeopleCarryBox size={40} />,
    },{
      name: "Diezmos",
      path: "/diezmos",
      icono: <FaMoneyBill1Wave size={40} />,
    },
  ]);

  return {
    menu,
  };
};

export { useMenu };
