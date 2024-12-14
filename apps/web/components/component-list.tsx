import CopyButton from "@/components/copy-btn";
import { extractSourceCode } from "@/lib/code";
import { cn } from "@/lib/utils";
import { registry } from "@ui/topia";

interface ComponentListProps {
  componentName: string;
  className?: string;
}

export default async function ComponentList({
  componentName,
  className,
}: ComponentListProps) {
  const component = registry[componentName];

  if (!component || !component.component) {
    return <div>Component not found</div>;
  }

  const Component = component.component;
  let code: string | null = null;

  try {
    const { code: sourceCode } = await extractSourceCode(componentName);
    code = sourceCode;
  } catch (error) {
    console.error(`Failed to read source code for ${componentName}:`, error);
    code = null;
  }

  return (
    <div className={cn("group/item relative", className)}>
      <Component />
      {code && <CopyButton componentSource={code} />}
    </div>
  );
}
