"use client"

import { useState } from "react"

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Trash,
} from "lucide-react"
import { BsBorderWidth } from "react-icons/bs"
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa"
import { RxTransparencyGrid } from "react-icons/rx"

import { Button } from "@/components/ui/button"
import { Hint } from "@/components/ui/hint"
import { FontSizeInput } from "@/features/editor/components/font-size-input"
import {
  ActiveTool,
  Editor,
  FONT_SIZE,
  FONT_WEIGHT,
} from "@/features/editor/types"
import { isTextType } from "@/features/editor/utils"
import { cn } from "@/lib/utils"

interface ToolbarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor()
  const initialStrokeColor = editor?.getActiveStrokeColor()
  const initialFontFamily = editor?.getActiveFontFamily()
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT
  const initialFontStyle = editor?.getActiveFontStyle()
  const initialFontLinethrough = editor?.getActiveFontLinethrough()
  const initialFontUnderline = editor?.getActiveFontUnderline()
  const initialTextAlign = editor?.getActiveTextAlign()
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    fontWeight: initialFontWeight,
    fontFamily: initialFontFamily,
    strokeColor: initialStrokeColor,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  })

  const selectedObject = editor?.selectedObjects[0]
  const selectedObjectType = editor?.selectedObjects[0]?.type
  const isText = isTextType(selectedObjectType)

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return

    editor?.changeFontSize(value)
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }))
  }

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return

    editor?.changeTextAlign(value)
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }))
  }

  const toggleBold = () => {
    if (!selectedObject) return

    const newValue = properties.fontWeight > 500 ? 500 : 700

    editor?.changeFontWeight(newValue)

    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }))
  }

  const toggleItalic = () => {
    if (!selectedObject) return

    const isItalic = properties.fontStyle === "italic"
    const newValue = isItalic ? "normal" : "italic"

    editor?.changeFontStyle(newValue)

    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }))
  }

  const toggleLinethrough = () => {
    if (!selectedObject) return

    const newValue = properties.fontLinethrough ? false : true

    editor?.changeFontLinethrough(newValue)

    setProperties((current) => ({
      ...current,
      fontLinethrough: newValue,
    }))
  }

  const toggleUnderline = () => {
    if (!selectedObject) return

    const newValue = properties.fontUnderline ? false : true

    editor?.changeFontUnderline(newValue)

    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }))
  }

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    )
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
            onClick={() => onChangeActiveTool("fill")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{ backgroundColor: properties.fillColor }}
            />
          </Button>
        </Hint>
      </div>
      {!isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Stroke color" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
              onClick={() => onChangeActiveTool("stroke-color")}
            >
              <div
                className="size-4 rounded-sm border-2 bg-white"
                style={{ borderColor: properties.strokeColor }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
              onClick={() => onChangeActiveTool("stroke-width")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100",
              )}
              onClick={() => onChangeActiveTool("font")}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="ml-2 size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
              onClick={toggleBold}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
              onClick={toggleItalic}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.fontUnderline && "bg-gray-100")}
              onClick={toggleUnderline}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.fontLinethrough && "bg-gray-100")}
              onClick={toggleLinethrough}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
              onClick={() => onChangeTextAlign("left")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align center" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
              onClick={() => onChangeTextAlign("center")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
              onClick={() => onChangeTextAlign("right")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      <div className="flex h-full items-center justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.bringForward()}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Send backwards" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.sendBackwards()}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
            onClick={() => onChangeActiveTool("opacity")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button size="icon" variant="ghost" onClick={() => editor?.delete()}>
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  )
}
