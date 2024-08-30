import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}
export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-1 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-2xl font-semibold my-3`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="text-xl mb-2">{subtitle}</h3>}
    </div>
  );
};
