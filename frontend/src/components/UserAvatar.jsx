import defaultAvatar from "../assets/defaultAvatar.png";

export function UserAvatar({ user = {}, width = 50, height = 50 }) {
  return (
    <img
      src={user?.avatar || defaultAvatar}
      width={width}
      height={height}
      alt={user?.name || "User avatar"}
      style={{borderRadius: "50%"}}
    />
  );
};