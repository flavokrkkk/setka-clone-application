import { useUserMutation } from "@/entities/user/hooks/useQueryMutate";
import Aside from "@/widgets/aside/ui/aside";
import Favorites from "@/widgets/favorites/ui/favorites";
import Header from "@/widgets/header/ui/header";
import Navigate from "@/widgets/navigate/ui/navigate";
import { UserPen } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  const { getCurrentUser } = useUserMutation();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="bg-black min-h-screen w-full flex overflow-x-hidden space-x-1">
      <Aside className="min-h-screen">
        <div className="flex">
          <Navigate />
          <Favorites />
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
    </div>
  );
};

export default RootPage;
