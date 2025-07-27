import {
  FaCalendarCheck,
  FaChartPie,
  FaChurch,
  FaHouseMedical,
  FaMoneyBill1Wave,
  FaPeopleCarryBox,
  FaPeopleGroup,
  FaUserCheck,
  FaUserGroup,
  FaUsers,
} from "react-icons/fa6";
import type { Menu } from "@/interfaces";
import { useState } from "react";

const useMenu = () => {
  const [menu] = useState<Menu[]>([
    { name: "Home", path: "/", icono: <FaHouseMedical size={30} /> },
    { name: "Personas", path: "/personas", icono: <FaUsers size={30} /> },

    {
      name: "Membresia",
      path: "/membresias",
      icono: <FaUserCheck size={30} />,
    },
    { name: "Eventos", path: "/eventos", icono: <FaCalendarCheck size={30} /> },
    { name: "Iglesia", path: "/iglesias", icono: <FaChurch size={30} /> },
    { name: "Familias", path: "/familias", icono: <FaPeopleGroup size={30} /> },
    {
      name: "Ofrendas",
      path: "/donaciones",
      icono: <FaPeopleCarryBox size={30} />,
    },
    {
      name: "Diezmos",
      path: "/diezmos",
      icono: <FaMoneyBill1Wave size={30} />,
    },
    {
      name: "Grupos",
      path: "/grupos",
      icono: <FaUserGroup size={30} />,
    },
    {
      name: "Reportes",
      path: "/reportes",
      icono: <FaChartPie size={30} />,
    },
  ]);

  return {
    menu,
  };
};

export { useMenu };
