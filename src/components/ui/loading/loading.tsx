import style from "./loading.module.css";
export const Loading = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center align-middle z-50">
      <div className={style.loader}></div>
    </div>
  );
};
