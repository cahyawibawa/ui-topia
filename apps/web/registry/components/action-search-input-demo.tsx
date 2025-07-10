"use client";

import {
  AudioLines,
  BarChart2,
  Globe,
  InfinityIcon,
  Search,
  Send,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import useDebounce from "@/registry/hooks/use-debounce";
import { Input } from "@/registry/ui/input";

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}

interface SearchResult {
  actions: Action[];
}

const allActions = [
  {
    description: "Deepseek-v3",
    end: "Agent",
    icon: <InfinityIcon className="h-4 w-4 text-blue-500" />,
    id: "1",
    label: "Agent",
    short: "⌘K",
  },
  {
    description: "gpt-4o",
    end: "Command",
    icon: <BarChart2 className="h-4 w-4 text-orange-500" />,
    id: "2",
    label: "Summarize",
    short: "⌘cmd+p",
  },
  {
    description: "gpt-4o",
    end: "Application",
    icon: <Video className="h-4 w-4 text-purple-500" />,
    id: "3",
    label: "Screen Studio",
    short: "",
  },
  {
    description: "claude 3.7-sonnet",
    end: "Command",
    icon: <AudioLines className="h-4 w-4 text-green-500" />,
    id: "4",
    label: "Code Voice",
    short: "",
  },
  {
    description: "gpt-4o",
    end: "Command",
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    id: "5",
    label: "Translate",
    short: "",
  },
];

function ActionSearchInput({ actions = allActions }: { actions?: Action[] }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [_isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      return;
    }

    if (!debouncedQuery) {
      setResult({ actions: allActions });
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const filteredActions = allActions.filter((action) => {
      const searchableText = action.label.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    setResult({ actions: filteredActions });
  }, [debouncedQuery, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const container = {
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
    hidden: { height: 0, opacity: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
      y: -10,
    },
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
      y: 0,
    },
  };

  // Reset selectedAction when focusing the input
  const handleFocus = () => {
    setSelectedAction(null);
    setIsFocused(true);
  };

  return (
    <div className="h-full w-full">
      <div className="sticky top-0 z-10 w-full bg-background pb-1">
        <div className="relative w-full">
          <Input
            className="h-9 w-full rounded-lg py-1.5 pr-9 pl-3 text-sm focus-visible:ring-offset-0"
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder="How can I help you today?"
            type="text"
            value={query}
          />
          <div className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4">
            <AnimatePresence mode="popLayout">
              {query.length > 0 ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  initial={{ opacity: 0, y: -20 }}
                  key="send"
                  transition={{ duration: 0.2 }}
                >
                  <Send className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  initial={{ opacity: 0, y: -20 }}
                  key="search"
                  transition={{ duration: 0.2 }}
                >
                  <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="w-full flex-1">
        <AnimatePresence>
          {isFocused && result && !selectedAction && (
            <motion.div
              animate="show"
              className="mt-1 w-full overflow-hidden rounded-md border bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
              exit="exit"
              initial="hidden"
              variants={container}
            >
              <motion.ul>
                {result.actions.map((action) => (
                  <motion.li
                    className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    key={action.id}
                    layout
                    onClick={() => setSelectedAction(action)}
                    variants={item}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{action.icon}</span>
                        <span className="font-medium text-gray-900 text-sm dark:text-gray-100">
                          {action.label}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {action.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">
                        {action.short}
                      </span>
                      <span className="text-right text-gray-400 text-xs">
                        {action.end}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-2 border-gray-100 border-t px-3 py-2 dark:border-gray-800">
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <span>Press ⌘K to open commands</span>
                  <span>ESC to cancel</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ActionSearchInput;
