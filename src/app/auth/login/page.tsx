import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import Image from "next/image";
import { TopMenuInvitado } from "@/components";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-170px)]">
      <div className="!flex h-[55vh] bg-red-500 w-full items-center justify-between px-10">
        <Image
          alt="bg-img"
          loading="lazy"
          width="1200"
          height="1200"
          decoding="async"
          data-nimg="1"
          className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
          src="/imgs/acto_imposicion_coifa.jpeg"
          style={{ color: "transparent" }}
        />
        <div className="container mx-auto mt-28 bg-yellow-300">
          <div className="grid grid-cols-12 text-center lg:text-left bg-fuchsia-500">
            <div className="relative bg-orange-400 flex flex-col bg-clip-border text-gray-700 col-span-full rounded-xl border border-white bg-white/90 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
              <div className="flex flex-col items-center content-center justify-center bg-green-500">
                <div className="lg:w-4/6 w-full">
                  <div className="flex flex-col bg-red-600">
                    <h1 className={`${titleFont.className} text-4xl mb-5`}>
                      Identificate
                    </h1>
                    <Suspense>
                      <LoginForm />
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
