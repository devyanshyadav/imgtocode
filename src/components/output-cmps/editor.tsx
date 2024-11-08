"use client";
import useZustStore from "@/lib/zust-store";
import { Sandpack } from "@codesandbox/sandpack-react";
import Toolbar from "../home-cmps/toolbar";


export default function CodePlayground() {
  const { File,code, setCode } = useZustStore();

  return (
    <div className="relative">
      <Sandpack
      theme={"dark"}
      template="react"
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
        showNavigator: false,
      }}
      customSetup={{
        dependencies: {
          "lucide-react": "latest",
          'react': "latest",
          "react-dom": "latest",
          "tailwindcss": "latest",
        },
      }}
      files={{
        "/App.js": code.replace(/^```.+?\n|```$/gm, ''),
      }}
    />
   <Toolbar/>
    </div>
  );
}
