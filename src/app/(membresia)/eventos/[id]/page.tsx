import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function ShowAsistenciaPage({ params: { id } }: Props) {
  return <div>ShowAsistenciaPage {id}</div>;
}
