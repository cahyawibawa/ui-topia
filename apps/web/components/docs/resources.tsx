type Resource = { url: string; title: string; description?: string };

const favicon = (url: string) =>
  `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;

function ResourceItems({ items }: { items: Resource[] }) {
  return (
    <ul className="my-0! flex list-none! flex-col gap-3 pl-0! [&>li+li]:mt-0!">
      {items.map((item) => (
        <li key={item.url}>
          <a
            className="group flex items-center gap-3 text-sm"
            data-slot="resource-link"
            href={item.url}
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt=""
              className="size-4 shrink-0 rounded-[4px]"
              height={16}
              loading="lazy"
              src={favicon(item.url)}
              width={16}
            />
            <span className="min-w-0 truncate">
              <span className="text-foreground group-hover:underline">
                {item.title}
              </span>
              {item.description && (
                <span className="text-muted-foreground">
                  {" "}
                  - {item.description}
                </span>
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Reading list under a note: favicon, title and a one-line summary. */
export function Resources({ items }: { items?: Resource[] }) {
  if (!items?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 font-medium text-base">Resources</h2>
      <ResourceItems items={items} />
    </section>
  );
}

/** A titled group of links, for the standalone Resources page. */
export function ResourceGroup({
  title,
  items,
}: {
  title: string;
  items: Resource[];
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-medium text-base">{title}</h2>
      <ResourceItems items={items} />
    </section>
  );
}
