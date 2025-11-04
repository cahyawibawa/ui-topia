import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";

export default function AvatarSizeDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
          alt="User"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=144&h=144&dpr=2&q=80"
          alt="User"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=192&h=192&dpr=2&q=80"
          alt="User"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    </div>
  );
}
