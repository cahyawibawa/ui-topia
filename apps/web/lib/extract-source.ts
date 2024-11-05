import fs from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "@/lib/shiki";
import { registry } from "@ui/topia";

export async function extractSourceCode(
  componentName: string,
): Promise<{ code: string; highlightedCode: string }> {
  const basePath = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "ui",
    "src",
  );

  // Get component info from registry
  const component = registry[componentName];

  if (!component) {
    const errorMsg = "// Component not found in registry";
    return {
      code: errorMsg,
      highlightedCode: await codeToHtml({ code: errorMsg, lang: "tsx" }),
    };
  }

  // Check if component has files
  if (!component.files || component.files.length === 0) {
    const errorMsg = "// No source files defined for this component";
    return {
      code: errorMsg,
      highlightedCode: await codeToHtml({ code: errorMsg, lang: "tsx" }),
    };
  }
  if (!component.files || component.files.length === 0) {
    const errorMsg = "// No source files defined for this component";
    return {
      code: errorMsg,
      highlightedCode: await codeToHtml({ code: errorMsg, lang: "tsx" }),
    };
  }

  const componentFile = component.files[0];
  if (!componentFile) {
    const errorMsg = "// No source file found for this component";
    return {
      code: errorMsg,
      highlightedCode: await codeToHtml({ code: errorMsg, lang: "tsx" }),
    };
  }

  const fullPath = path.join(basePath, componentFile.replace(/^\.\//, ""));

  try {
    const code = await fs.readFile(fullPath, "utf8");
    const highlightedCode = await codeToHtml({ code, lang: "tsx" });
    return { code, highlightedCode };
  } catch (error) {
    const errorMsg = `// Failed to read source code for ${componentName}\n// Path attempted: ${fullPath}`;
    return {
      code: errorMsg,
      highlightedCode: await codeToHtml({ code: errorMsg, lang: "tsx" }),
    };
  }
}
