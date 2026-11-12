import { avatarOf, MAKERS, type MakerKey, profileOf } from "@/lib/makers";

/** The people whose work is in the collection. Your own work isn't listed. */
const COLLECTED: MakerKey[] = ["sanyam", "arlan"];

/** Their avatars, overlapped and linking to their profiles: a small nod on the hero. */
export function MakerStack() {
  return (
    <div className="-space-x-1.5 ml-auto flex items-center pl-3">
      {COLLECTED.map((key) => {
        const person = MAKERS[key];
        return (
          <a
            className="hover:-translate-y-0.5 relative rounded-full ring-2 ring-white transition-transform duration-200 hover:z-10 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-sky-500"
            href={profileOf(person)}
            key={key}
            rel="noreferrer"
            target="_blank"
            title={`${person.name} on X`}
          >
            {/* biome-ignore lint/performance/noImgElement: a small avatar from GitHub's CDN, not worth a remote image pattern */}
            <img
              alt={person.name}
              className="size-6 rounded-full bg-neutral-200"
              height={24}
              loading="lazy"
              src={avatarOf(person)}
              width={24}
            />
          </a>
        );
      })}
    </div>
  );
}
