"use client";

import {
  Check,
  ChevronRight,
  Clipboard,
  File,
  FolderOpen,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react";
import * as React from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { CodeBlock } from "@/components/code-block";
import { V0Button } from "@/components/v0-button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { RegistryItem } from "@/lib/registry";
import {
  convertRegistryPaths,
  createFileTreeForRegistryItemFiles,
  type FileTree,
  getFileTarget,
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
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs";
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

  // Create a map for quick lookup of original path from transformed path
  const filePathMap = React.useMemo(() => {
    const map = new Map<string, string>();
    if (item.files) {
      for (const file of item.files) {
        const targetPath = getFileTarget(file);
        if (targetPath) {
          map.set(targetPath, file.path);
        }
      }
    }
    return map;
  }, [item.files]);

  React.useEffect(() => {
    async function loadInitialFile() {
      if (!item.files?.length) {
        console.error("No files found for item:", name);
        return;
      }

      // Find the main component file (usually page.tsx or first component)
      const mainFile =
        item.files.find(
          (f: { path: string }) =>
            f.path.endsWith("page.tsx") || f.path.includes("/components/"),
        ) || item.files[0]; // Fallback to the first file

      if (!mainFile) {
        console.error("No main file found for item:", name);
        return;
      }

      const initialTransformedPath = getFileTarget(mainFile);
      if (initialTransformedPath) {
        setActiveFile(initialTransformedPath); // Set active file to the transformed path

        // Fetch initial content using the original path
        try {
          const response = await fetch(`/r/${name}.json`);
          const data = (await response.json()) as RegistryItem;
          const fileData = data.files?.find(
            (f: { path: string; content?: string }) => f.path === mainFile.path,
          );
          if (fileData?.content) {
            setCodeContent(convertRegistryPaths(fileData.content));
          }
        } catch (err) {
          console.error("Error loading initial file content:", err);
          setCodeContent(null);
        }
      }
    }

    loadInitialFile();
  }, [item, name]); // Depend on item to re-run if item changes

  // Update code content when active file changes
  React.useEffect(() => {
    async function updateCodeContent() {
      if (!activeFile) return;

      // Find the original path using the map
      const originalPath = filePathMap.get(activeFile);
      if (!originalPath) {
        console.error("Original path not found for active file:", activeFile);
        return;
      }

      try {
        const response = await fetch(`/r/${name}.json`);
        const data = (await response.json()) as RegistryItem;
        // Find the file data using the original path
        const file = data.files?.find(
          (f: { path: string; content?: string }) => f.path === originalPath,
        );

        if (file?.content) {
          setCodeContent(convertRegistryPaths(file.content));
        }
      } catch (err) {
        console.error("Error loading file content:", err);
        setCodeContent(null);
      }
    }

    updateCodeContent();
  }, [activeFile, name, filePathMap]); // Add filePathMap dependency

  return (
    <BlockViewerContext.Provider
      value={{
        activeFile,
        codeContent,
        componentName: name,
        iframeHeight,
        item,
        resizablePanelRef,
        setActiveFile,
        setCodeContent,
        setView,
        view,
      }}
    >
      <div
        className="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
        data-view={view}
        id={item.name}
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
  const { componentName, item, resizablePanelRef, setView, view } =
    useBlockViewer();
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
        className="hidden gap-0 lg:flex"
        onValueChange={(value) => setView(value as "preview" | "code")}
        value={view}
      >
        <TabsList className="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]">
          <TabsTrigger
            className="h-[1.45rem] rounded-sm px-2 text-xs"
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            className="h-[1.45rem] rounded-sm px-2 text-xs"
            value="code"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator className="mx-2 hidden h-4 lg:flex" orientation="vertical" />
      <a
        className="font-medium text-sm underline-offset-2 hover:underline"
        href={`#${item.name}`}
      >
        {item.description}
      </a>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
          <Button
            className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
            onClick={() => handleDeviceChange("desktop")}
            size="icon"
            title="Desktop"
            variant="ghost"
          >
            <Monitor className="h-3.5 w-3.5" />
          </Button>
          <Button
            className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
            onClick={() => handleDeviceChange("tablet")}
            size="icon"
            title="Tablet"
            variant="ghost"
          >
            <Tablet className="h-3.5 w-3.5" />
          </Button>
          <Button
            className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
            onClick={() => handleDeviceChange("mobile")}
            size="icon"
            title="Mobile"
            variant="ghost"
          >
            <Smartphone className="h-3.5 w-3.5" />
          </Button>
        </div>
        <Separator className="mx-1 hidden h-4 md:flex" orientation="vertical" />
        <div className="flex h-7 items-center gap-1 rounded-md border p-[2px]">
          <Button
            className="hidden h-[22px] w-auto gap-1 rounded-sm px-2 md:flex lg:w-auto"
            onClick={() => {
              copyToClipboard(
                `npx shadcn@latest add https://uitopia.vercel.app/r/${item.name}.json`,
              );
            }}
            size="sm"
            variant="ghost"
          >
            {isCopied ? <Check /> : <Terminal />}
            <span className="hidden lg:inline">
              npx shadcn@latest add https://uitopia.vercel.app/r/{item.name}
              .json
            </span>
          </Button>
        </div>
        <Separator className="mx-1 hidden h-4 xl:flex" orientation="vertical" />
        <V0Button
          className="hidden shadow-none sm:flex"
          componentSource={`https://uitopia.vercel.app/r/${componentName}.json`}
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
        <ResizablePanelGroup className="relative z-10" direction="horizontal">
          <ResizablePanel
            className="relative rounded-xl border bg-background"
            defaultSize={100}
            minSize={30}
            ref={resizablePanelRef}
          >
            <div className="flex w-full items-center justify-center p-4">
              <div className="w-full max-w-md">
                <React.Suspense
                  fallback={
                    <div className="flex min-h-[450px] w-full items-center justify-center text-muted-foreground text-sm">
                      <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                      Loading ...
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
          <File className="h-4 w-4" />
          {activeFile}
          {/* <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div> */}
        </div>

        <div className="relative flex-1 overflow-hidden">
          <CodeBlock code={codeContent} language="tsx" showLineNumbers />
        </div>
      </div>
    </div>
  );
}

function BlockViewerFileTree() {
  const { item } = useBlockViewer();
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
        className="w-full flex-1 bg-muted text-foreground dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        collapsible="none"
      >
        <SidebarGroupLabel className="h-12 rounded-none border-b px-4 text-foreground text-sm dark:border-zinc-700 dark:text-white">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {tree.map((file, index) => (
                <Tree index={1} item={file} key={index} />
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
          className="whitespace-nowrap rounded-none pl-[--index] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground active:bg-accent active:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground dark:data-[active=true]:bg-zinc-700 dark:data-[active=true]:text-white dark:active:bg-zinc-700 dark:active:text-white dark:focus-visible:bg-zinc-700 dark:focus-visible:text-white dark:focus:bg-zinc-700 dark:focus:text-white dark:hover:bg-zinc-700 dark:hover:text-white"
          data-index={index}
          isActive={item.displayPath === activeFile}
          onClick={() => item.displayPath && setActiveFile(item.displayPath)}
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
              <Tree index={index + 1} item={subItem} key={key} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function _BlockCopyCodeButton() {
  const { codeContent } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  if (!codeContent) {
    return null;
  }

  return (
    <Button
      className="h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3"
      onClick={() => {
        copyToClipboard(codeContent);
      }}
      variant="ghost"
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  );
}
