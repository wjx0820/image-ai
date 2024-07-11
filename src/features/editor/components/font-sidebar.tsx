import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close"
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header"
import { ActiveTool, Editor, fonts } from "@/features/editor/types"
import { cn } from "@/lib/utils"

interface FontSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily()

  const onClose = () => {
    onChangeActiveTool("select")
  }

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Font" description="Modify the font" />
      <ScrollArea>
        <div className="space-y-1 border-b p-4">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "h-16 w-full justify-start px-2 py-4 text-left text-base",
                value === font && "border-2 border-blue-500",
              )}
              style={{ fontFamily: font }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}