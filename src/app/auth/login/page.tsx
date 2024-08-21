import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-full px-5">
      <div className="min-h-[calc(100vh-170px)] justify-center ">
        <div className="flex flex-col">
          <div className="mt-28">
            <div className="">
              <div className="rounded-lg shadow-2xl bg-gray-100 border-gray-200 border-spacing-1 border">
                <div className="flex flex-col p-6">
                  <div className="w-full">
                    <div className="flex flex-col ">
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
    </div>
  );
}
