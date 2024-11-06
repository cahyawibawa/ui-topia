"use client";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import Globe from "@/components/globe";
import { Calendar } from "@/components/shadcn-ui/calendar";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Marquee  ",
    description:
      "An infinite scrolling component that can be used to display text, images, or videos.",
    href: "https://magicui.design/docs/components/marquee",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <img className="-right-20 -top-20 absolute opacity-60" />,
  },
  {
    Icon: InputIcon,
    name: "cmdk",
    description: "Fast, composable, unstyled command menu for React",
    href: "https://cmdk.paco.me/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <img className="-right-20 -top-20 absolute opacity-60" />,
  },
  {
    Icon: GlobeIcon,
    name: "COBE",
    description: "A lightweight (5kB) WebGL globe lib.",
    href: "https://www.npmjs.com/package/cobe",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Globe className="top-0 size-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "The Calendar component is built on top of React DayPicker.",
    className: "col-span-3 lg:col-span-1",
    href: "https://ui.shadcn.com/docs/components/calendar",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export default function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
