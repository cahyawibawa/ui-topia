import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";

export default function AvatarRadiusDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="rounded-md">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="User"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-xl">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="User"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-full">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="User"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    </div>
  );
}
