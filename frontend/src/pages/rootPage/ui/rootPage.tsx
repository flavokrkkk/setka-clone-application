import { useUserMutation } from "@/entities/user/hooks/useQueryMutate";
import UserControl from "@/features/user/ui/userControl/ui/userControl";
import { Command, CommandInput, CommandList } from "@/shared/ui";
import Aside from "@/widgets/aside/ui/aside";
import Favorites from "@/widgets/favorites/ui/favorites";
import Header from "@/widgets/header/ui/header";
import Navigate from "@/widgets/navigate/ui/navigate";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  const { getCurrentUser } = useUserMutation();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="bg-black min-h-screen w-full flex overflow-x-hidden space-x-1">
      <Aside className="min-h-screen w-[500px]">
        <div className="flex w-full">
          <Navigate />
          <div className="flex flex-col w-full space-y-6 p-2">
            <Command className="text-white bg-gray-300 h-9">
              <CommandInput placeholder="Поиск" className="h-9" />
              <CommandList />
            </Command>
            <Favorites />
          </div>
        </div>
      </Aside>
      <div className="flex flex-col rounded-lg w-full">
        <header className="sticky top-0 bg-black z-10">
          <Header title="StrifeMe" />
        </header>
        <div className="flex flex-1 h-full overflow-y-auto">
          <main className="flex-grow bg-black text-white">
            <Outlet />
          </main>
        </div>
      </div>
      <Aside className="min-h-screen w-[350px] p-2">
        <div className="flex w-full bg-gray-300 p-1 px-2 rounded-md">
          <UserControl />
        </div>
      </Aside>
    </div>
  );
};

export default RootPage;
