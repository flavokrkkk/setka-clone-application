import clsx from "clsx";

const communitiesMockList = [
  {
    id: 1,
    title: "Strife Events",
    description: "Все события Strife в одном сообществе!",
    color: "#6d28d9",
  },
  {
    id: 2,
    title: "Хижина ByteSpace",
    description: "IT Комьюнити",
    color: "#166534",
  },
  {
    id: 3,
    title: "Нескучный Нетворкинг",
    description: "Привет меня завут Александр",
    color: "#2563eb",
  },
  {
    id: 4,
    title: "Немного продакт",
    description: "Метод “5 почему” в продуктовой работе",
    color: "#6d28d9",
  },
];

const CommunitiesList = () => {
  return communitiesMockList.map((friend) => (
    <div
      key={friend.id}
      className={clsx(
        `flex flex-col border-b min-h-[83px] justify-around bg-gray-200 hover:bg-gray-500 cursor-pointer p-3 rounded-lg`,
      )}
      style={{ borderBottom: `1px solid ${friend.color}` }}
    >
      <h2 className="text-sm font-medium">{friend.title}</h2>
      <p className="text-xs font-light">{friend.description}</p>
    </div>
  ));
};

export default CommunitiesList;
