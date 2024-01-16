"use client";

import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">
        <div className="flex">
          {availableSizes.map((size) => (
            <button
              type="button"
              key={size}
              className={clsx("mx-2 hover:underline text-lg", {
                underline: size === selectedSize,
              })}
            >
              {size}
            </button>
          ))}
        </div>
      </h3>
    </div>
  );
};
