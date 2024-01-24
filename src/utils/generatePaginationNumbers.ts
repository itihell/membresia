export const generatePaginationNumbers = (
  currenPage: number,
  totalPages: number
) => {
  // TODO: Si el numero total de paginas es 7 o menor
  // vamos a mostrar todas las paginas
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // Si la pagina acutal esta entre 1 y 3 vamos
  // a mostrar las primeras 3 paginas, puntos suspensivos y las ultimas 2 paginas
  if (currenPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Si la pagina actual entra entre las ultimas 3 paginas
  // mostrar las primeras 2 paginas, puntos suspensivos y las ultimas 3 paginas
  if (currenPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la pagina actual esta en otros lugares medios
  // mostrar la primera pagina y puntos suspensivos, la pagina actual y vecinos
  return [
    1,
    "...",
    currenPage - 1,
    currenPage,
    currenPage + 1,
    "...",
    totalPages,
  ];
};
