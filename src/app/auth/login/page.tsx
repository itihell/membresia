import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-full px-5">
      <div className="min-h-[calc(100vh-170px)] justify-center ">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-28 w-full sm:w-4/6 md:w-3/6 lg:w-3/6 xl:w-3/12">
            <div className="w-full">
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
