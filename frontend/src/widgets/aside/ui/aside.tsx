import clsx from "clsx";
import { FC } from "react";

interface IAside {
  children: React.ReactNode;
  className?: string;
}
const Aside: FC<IAside> = ({ children, className }) => {
  return (
    <div className={clsx("w-[380px] min-h-screen bg-gray-200", className)}>
      <section className="sticky top-0">{children}</section>
    </div>
  );
};

export default Aside;
