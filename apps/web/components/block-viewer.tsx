"use client";

import {
  Check,
  ChevronRight,
  Clipboard,
  File,
  Folder,
  FolderOpen,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react";
import * as React from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";
import type { RegistryItem } from "shadcn/registry";

import { CodeBlock } from "@/components/code-block";
import { V0Button } from "@/components/v0-button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  type FileTree,
  convertRegistryPaths,
  createFileTreeForRegistryItemFiles,
} from "@/lib/registry";
import { Icons } from "@/registry/components/icons";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/registry/ui/sidebar";
import { Button } from "@/uitopia/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/uitopia/collapsible";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/uitopia/resizable";
import { Separator } from "@/uitopia/separator";
import { Tabs, TabsList, TabsTrigger } from "@/uitopia/tabs";

type BlockViewerContext = {
  item: RegistryItem;
  view: "code" | "preview";
  setView: (view: "code" | "preview") => void;
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null>;
  componentName: string;
  codeContent: string | null;
  setCodeContent: (code: string | null) => void;
  iframeHeight: string;
};

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null);

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext);
  if (!context) {
    throw new Error(
      "useBlockViewer must be used within a BlockViewerProvider.",
    );
  }
  return context;
}

interface BlockViewerProps {
  item: RegistryItem;
  name: string;
  meta?: { iframeHeight?: string };
}

export function BlockViewer({ item, name, meta }: BlockViewerProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview");
  const [activeFile, setActiveFile] = React.useState<string | null>(null);
  const [codeContent, setCodeContent] = React.useState<string | null>(null);
  const resizablePanelRef = React.useRef<ImperativePanelHandle | null>(null);
  const iframeHeight = meta?.iframeHeight ?? "350px";

  React.useEffect(() => {
    async function loadComponentCode() {
      try {
        const response = await fetch(`/r/${name}.json`);
        const data = (await response.json()) as RegistryItem;

        if (!data.files?.length) {
          throw new Error("No files found");
        }

        // Find the main component file (usually in components folder)
        const mainFile = data.files.find(
          (f) => f.path.includes("/components/") || f.path.endsWith("page.tsx"),
        );

        if (!mainFile) {
          throw new Error("No main file found");
        }

        setActiveFile(mainFile.path);

        if (mainFile.content) {
          setCodeContent(convertRegistryPaths(mainFile.content));
        }
      } catch (err) {
        console.error("Error loading component:", err);
        setCodeContent(null);
      }
    }

    loadComponentCode();
  }, [name]);

  // Update code content when active file changes
  React.useEffect(() => {
    async function updateCodeContent() {
      if (!activeFile) return;

      try {
        const response = await fetch(`/r/${name}.json`);
        const data = (await response.json()) as RegistryItem;
        const file = data.files?.find((f) => f.path === activeFile);

        if (file?.content) {
          setCodeContent(convertRegistryPaths(file.content));
        }
      } catch (err) {
        console.error("Error loading file content:", err);
        setCodeContent(null);
      }
    }

    updateCodeContent();
  }, [activeFile, name]);

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        setView,
        resizablePanelRef,
        activeFile,
        setActiveFile,
        componentName: name,
        codeContent,
        setCodeContent,
        iframeHeight,
      }}
    >
      <div
        id={item.name}
        data-view={view}
        className="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
        style={{ "--height": iframeHeight } as React.CSSProperties}
      >
        <BlockViewerToolbar />
        <BlockViewerView />
        <BlockViewerCode />
      </div>
    </BlockViewerContext.Provider>
  );
}

function BlockViewerToolbar() {
  const { setView, item, resizablePanelRef, componentName } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const handleDeviceChange = React.useCallback(
    (value: string) => {
      if (resizablePanelRef?.current) {
        // Use different sizes for different devices
        switch (value) {
          case "desktop":
            resizablePanelRef.current.resize(100);
            break;
          case "tablet":
            resizablePanelRef.current.resize(60);
            break;
          case "mobile":
            resizablePanelRef.current.resize(30);
            break;
          default:
            resizablePanelRef.current.resize(100);
        }
      }
    },
    [resizablePanelRef],
  );

  return (
    <div className="flex w-full items-center gap-2 md:pr-[14px]">
      <Tabs
        defaultValue="preview"
        onValueChange={(value) => setView(value as "preview" | "code")}
        className="hidden lg:flex"
      >
        <TabsList className="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]">
          <TabsTrigger
            value="preview"
            className="h-[1.45rem] rounded-sm px-2 text-xs"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="h-[1.45rem] rounded-sm px-2 text-xs"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator orientation="vertical" className="mx-2 hidden h-4 lg:flex" />
      <a
        href={`#${item.name}`}
        className="font-medium text-sm underline-offset-2 hover:underline"
      >
        {item.description}
      </a>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
            title="Desktop"
            onClick={() => handleDeviceChange("desktop")}
          >
            <Monitor className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
            title="Tablet"
            onClick={() => handleDeviceChange("tablet")}
          >
            <Tablet className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
            title="Mobile"
            onClick={() => handleDeviceChange("mobile")}
          >
            <Smartphone className="h-3.5 w-3.5" />
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-1 hidden h-4 md:flex" />
        <div className="flex h-7 items-center gap-1 rounded-md border p-[2px]">
          <Button
            variant="ghost"
            className="hidden h-[22px] w-auto gap-1 rounded-sm px-2 md:flex lg:w-auto"
            size="sm"
            onClick={() => {
              copyToClipboard(
                `bunx --bun shadcn@latest add https://uitopia.xyz/r/${item.name}.json`,
              );
            }}
          >
            {isCopied ? <Check /> : <Terminal />}
            <span className="hidden lg:inline">
              bunx --bun shadcn@latest add https://uitopia.xyz/r/{item.name}
              .json
            </span>
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-1 hidden h-4 xl:flex" />
        <V0Button
          className="hidden shadow-none sm:flex"
          componentSource={`https://uitopia.xyz/r/${componentName}.json`}
        />
      </div>
    </div>
  );
}

function BlockViewerView() {
  const { componentName, iframeHeight, resizablePanelRef } = useBlockViewer();

  const Component = React.useMemo(() => {
    const ComponentModule = React.lazy(() =>
      import(`@/registry/blocks/${componentName}/page`).catch((err) => {
        console.error("Error loading component:", err);
        return {
          default: () => (
            <div className="flex min-h-[200px] w-full items-center justify-center text-muted-foreground text-sm">
              Failed to load component
            </div>
          ),
        };
      }),
    );
    return ComponentModule;
  }, [componentName]);

  return (
    <div
      className="group-data-[view=code]/block-view-wrapper:hidden"
      style={{
        height: iframeHeight !== "auto" ? iframeHeight : undefined,
        minHeight: iframeHeight === "auto" ? "fit-content" : undefined,
      }}
    >
      <div className="grid w-full gap-4">
        <ResizablePanelGroup direction="horizontal" className="relative z-10">
          <ResizablePanel
            ref={resizablePanelRef}
            className="relative rounded-xl border bg-background"
            defaultSize={100}
            minSize={30}
          >
            <div className="flex w-full items-center justify-center p-4">
              <div className="w-full max-w-md">
                <React.Suspense
                  fallback={
                    <div className="flex min-h-[200px] w-full items-center justify-center text-muted-foreground text-sm">
                      <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                      Loading component...
                    </div>
                  }
                >
                  <Component />
                </React.Suspense>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle className="after:-translate-y-1/2 relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

function BlockViewerCode() {
  const { activeFile, codeContent, iframeHeight } = useBlockViewer();

  if (!codeContent) {
    return (
      <div
        className="flex items-center justify-center text-muted-foreground text-sm group-data-[view=preview]/block-view-wrapper:hidden"
        style={{
          height: iframeHeight !== "auto" ? iframeHeight : "fit-content",
          minHeight: iframeHeight === "auto" ? "300px" : undefined,
        }}
      >
        Loading code...
      </div>
    );
  }

  return (
    <div
      className="mr-[14px] flex overflow-hidden rounded-xl border bg-background text-foreground group-data-[view=preview]/block-view-wrapper:hidden dark:bg-zinc-950 dark:text-white"
      style={{
        height: "fit-content",
        maxHeight: iframeHeight !== "auto" ? iframeHeight : undefined,
        minHeight: "300px",
      }}
    >
      <div className="w-[280px] border-r dark:border-zinc-700">
        <BlockViewerFileTree />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b bg-muted px-4 font-medium text-sm dark:border-zinc-700 dark:bg-zinc-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-react"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
            <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
            <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
            <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
            <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
            <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
            <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
          </svg>
          {activeFile}
          {/* <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div> */}
        </div>

        <div className="relative flex-1 overflow-hidden">
          <CodeBlock code={codeContent} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function BlockViewerFileTree() {
  const { item, activeFile, setActiveFile } = useBlockViewer();
  const [tree, setTree] = React.useState<FileTree[]>([]);

  React.useEffect(() => {
    if (item.files) {
      const fileTree = createFileTreeForRegistryItemFiles(item.files);
      setTree(fileTree);
    }
  }, [item.files]);

  return (
    <SidebarProvider className="!min-h-full flex flex-col">
      <Sidebar
        collapsible="none"
        className="w-full flex-1 bg-muted text-foreground dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
      >
        <SidebarGroupLabel className="h-12 rounded-none border-b px-4 text-foreground text-sm dark:border-zinc-700 dark:text-white">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {tree.map((file, index) => (
                <Tree key={index} item={file} index={1} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer();

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="whitespace-nowrap rounded-none pl-[--index] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground active:bg-accent active:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground dark:data-[active=true]:bg-zinc-700 dark:data-[active=true]:text-white dark:active:bg-zinc-700 dark:active:text-white dark:focus-visible:bg-zinc-700 dark:focus-visible:text-white dark:focus:bg-zinc-700 dark:focus:text-white dark:hover:bg-zinc-700 dark:hover:text-white"
          data-index={index}
          style={
            {
              "--index": `${index * 1.25}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="whitespace-nowrap rounded-none pl-[--index] hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground active:bg-accent active:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:hover:text-accent-foreground dark:data-[active=true]:bg-zinc-700 dark:data-[active=true]:text-white dark:active:bg-zinc-700 dark:active:text-white dark:focus-visible:bg-zinc-700 dark:focus-visible:text-white dark:hover:bg-zinc-700 dark:hover:text-white dark:data-[state=open]:hover:bg-zinc-700 dark:data-[state=open]:hover:text-white"
            style={
              {
                "--index": `${index * 1.25}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="h-4 w-4 transition-transform" />
            <FolderOpen className="h-4 w-4" />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree key={key} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function BlockCopyCodeButton() {
  const { codeContent, item } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  if (!codeContent) {
    return null;
  }

  return (
    <Button
      onClick={() => {
        copyToClipboard(codeContent);
      }}
      className="h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3"
      variant="ghost"
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  );
}
