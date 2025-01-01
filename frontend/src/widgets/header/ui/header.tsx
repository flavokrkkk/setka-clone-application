import UserControl from "@/features/user/ui/userControl/ui/userControl";
import { Command, CommandInput, CommandList } from "@/shared/ui";
import { BellIcon } from "lucide-react";
import { FC } from "react";

interface IHeader {
  title: string;
}
const Header: FC<IHeader> = ({ title }) => {
  return (
    <header className="border-b border-gray-200 sticky top-0">
      <section className=" p-3 px-14 text-white flex items-center justify-between bg-black">
        <div>
          <h1 className="font-bold">{title}</h1>
        </div>
        <section className="flex items-center space-x-2">
          <Command className="rounded-lg shadow-md md:min-w-[450px] text-white bg-gray-300 h-9">
            <CommandInput placeholder="Поиск" className="h-9" />
            <CommandList />
          </Command>
          <div className="bg-gray-300 relative items-center flex space-x-1 p-[8.5px] px-4 rounded-lg shadow-md h-9">
            <BellIcon className="h-[18px] w-[18px] cursor-pointer" />
            <span className="bg-violet-700 cursor-pointer text-xs py-[0.8px] px-2 rounded-xl flex items-center">
              11
            </span>
          </div>
        </section>
        <UserControl />
      </section>
    </header>
  );
};

export default Header;
