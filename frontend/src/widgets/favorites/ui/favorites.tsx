import FriendList from "@/features/friends/ui/friendList/ui/friendList";

const Favorites = () => {
  return (
    <div className="w-full space-y-2">
      <section className="text-white space-y-1">
        <FriendList />
      </section>
    </div>
  );
};

export default Favorites;
