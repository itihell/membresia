import { TopMenuInvitado } from "@/components";
import { titleFont } from "@/config/fonts";
import Image from "next/image";
import { RegisterForm } from "./ui/RegisterForm";
import { Suspense } from "react";

export default function NewAccountPage() {
  return (
    <div className="h-screen">
      <div className="!flex h-[55vh] w-full items-center justify-between px-10">
        <Image
          alt="bg-img"
          loading="lazy"
          width="1200"
          height="1200"
          decoding="async"
          data-nimg="1"
          className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
          src="/imgs/entrada_enfermeros.jpeg"
          style={{ color: "transparent" }}
        />
        <div className="container mx-auto mt-28">
          <div className="grid grid-cols-12 text-center lg:text-left">
            <div className="relative flex flex-col bg-clip-border text-gray-700 col-span-full rounded-xl border border-white bg-white/90 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
              <div className="flex flex-col items-center content-center justify-center">
                <div className="lg:w-3/6 w-full">
                  <div className="flex flex-col">
                    <h1 className={`${titleFont.className} text-4xl mb-5`}>
                      Nueva cuenta
                    </h1>
                    <Suspense>
                      <RegisterForm />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
