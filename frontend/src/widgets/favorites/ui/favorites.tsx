import CommunitiesList from "@/features/communities/ui/communitiesList/communitiesList";
import FriendList from "@/features/friends/ui/friendList/ui/friendList";

const Favorites = () => {
  return (
    <div className="bg-gray-300">
      <section className="p-3 text-white space-y-3">
        <h1 className="text-sm pl-1 font-bold">Лучшие друзья</h1>
        <section className="space-y-2">
          <FriendList />
        </section>
      </section>
      <section className="p-3 text-white space-y-3">
        <h1 className="text-sm pl-1 font-bold">Сообщества</h1>
        <section className="space-y-2">
          <CommunitiesList />
        </section>
      </section>
    </div>
  );
};

export default Favorites;
