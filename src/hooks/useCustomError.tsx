import { toast } from "sonner";

export interface ErrorRenders {
  proi: Proi;
  message: string;
  errors: string[];
}

export interface Proi {
  message: string[];
  error: string;
  statusCode: number;
}
export const useCustomError = () => {
  const handlerValidaError = (errors: any[]) => {
    return errors.map((element, index) =>
      toast.error("ERROR", {
        descriptionClassName: "text-red-600",
        classNames: {
          title: "text-red-600",
          description: "text-red-600",
          error: "bg-red-600",
          icon: "text-red-600",
          toast: "bg-red-600 text-red-600",
          default: "bg-red-700",
        },
        position: "top-right",
        description: element.message,
      })
    );
  };
  const handlerMessage = (message: string) => {
    toast.info("INFO", {
      classNames: {
        title: "text-blue-600",
        description: "text-blue-600",
        icon: "text-blue-600",
      },
      position: "top-right",
      description: message,
    });
  };

  const handlerSuccess = (data: any) => {
    toast.success("Éxito", {
      classNames: {
        title: "text-blue-600",
        description: "text-blue-600",
        icon: "text-blue-600",
      },
      position: "top-right",
      description: data?.message,
    });
  };

  const handlerSingleError = (title: string, message: string) => {
    toast.error(title, {
      classNames: {
        title: "text-red-600",
        description: "text-red-600",
        icon: "text-red-600",
      },
      position: "top-right",
      description: message,
    });
  };

  const handlerSingleSuccess = (title: string, message: string) => {
    toast.error(title, {
      classNames: {
        title: "text-green-600",
        description: "text-green-600",
        icon: "text-green-600",
      },
      position: "top-right",
      description: message,
    });
  };

  const handlerErrors = (errors: ErrorRenders) => {
    if (typeof errors.errors === "string") {
      return toast.error("ERROR", {
        descriptionClassName: "text-red-600",
        classNames: {
          title: "text-red-600",
          description: "text-red-600",
          error: "bg-red-600",
          icon: "text-red-600",
          toast: "bg-red-600 text-red-600",
          default: "bg-red-700",
        },
        position: "top-right",
        description: errors.errors,
      });
    }

    return errors.errors.map((element, index) =>
      toast.error("ERROR", {
        descriptionClassName: "text-red-600",
        classNames: {
          title: "text-red-600",
          description: "text-red-600",
          error: "bg-red-600",
          icon: "text-red-600",
          toast: "bg-red-600 text-red-600",
          default: "bg-red-700",
        },
        position: "top-right",
        description: element,
      })
    );
  };
  return {
    handlerSingleSuccess,
    handlerValidaError,
    handlerErrors,
    handlerSuccess,
    handlerMessage,
    handlerSingleError,
  };
};
