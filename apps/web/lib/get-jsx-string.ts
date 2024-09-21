import React from "react";
//  avoiding the need for flushSync and createRoot.
export function getJSXString(element: React.ReactElement): string {
  if (typeof element.type === "string") {
    const props = element.props;
    const children = props.children;
    const attributes = Object.entries(props)
      .filter(([key]) => key !== "children")
      .map(([key, value]) => {
        if (key === "className") {
          return `className="${value}"`;
        }
        if (key === "style") {
          const styleString = Object.entries(
            value as Record<string, string | number>,
          )
            .map(
              ([k, v]) =>
                `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${v}`,
            )
            .join("; ");
          return `style={{${styleString}}}`;
        }
        if (typeof value === "string") {
          return `${key}="${value}"`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(" ");

    if (children) {
      const childrenString =
        React.Children.map(children, (child) =>
          React.isValidElement(child) ? getJSXString(child) : String(child),
        )?.join("") ?? "";
      return `<${element.type} ${attributes}>${childrenString}</${element.type}>`;
    }

    return `<${element.type} ${attributes} />`;
  }

  // For custom components, we'll just stringify their props
  return `<${element.type.name} ${JSON.stringify(element.props)} />`;
}
