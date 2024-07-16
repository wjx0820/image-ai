import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ColorPicker } from "@/features/editor/components/color-picker"
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close"
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header"
import { ActiveTool, Editor } from "@/features/editor/types"
import { cn } from "@/lib/utils"

interface SettingsSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  const workspace = editor?.getWorkSpace()

  const initialWidth = useMemo(
    () => `${workspace?.width ?? 0}` ?? 0,
    [workspace],
  )
  const initialHeight = useMemo(
    () => `${workspace?.height ?? 0}` ?? 0,
    [workspace],
  )
  const initialBackground = useMemo(
    () => workspace?.fill ?? "#ffffff",
    [workspace],
  )

  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)
  const [background, setBackground] = useState(initialBackground)

  useEffect(() => {
    setWidth(initialWidth)
    setHeight(initialHeight)
    setBackground(initialBackground)
  }, [initialBackground, initialHeight, initialWidth])

  const changeWidth = (value: string) => setWidth(value)
  const changeHeight = (value: string) => setHeight(value)
  const changeBackground = (value: string) => {
    setBackground(value)
    editor?.changeBackground(value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    })
  }

  const onClose = () => {
    onChangeActiveTool("select")
  }

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "settings" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Settings" description="Workspace settings" />
      <ScrollArea>
        <form className="space-y-4 p-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker
            value={background as string}
            onChange={changeBackground}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
