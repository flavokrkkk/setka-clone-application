import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b p-4 bg-gray-800 text-white">Header</header>
      <div className="flex flex-1">
        <aside className="border-r w-64 p-4 bg-gray-200">Aside content</aside>
        <main className="flex-grow bg-black text-white p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootPage;
