"use client"

import { useEffect, useRef } from "react"

import { fabric } from "fabric"

import { Navbar } from "@/features/editor/components/navbar"
import { Sidebar } from "@/features/editor/components/sidebar"
import { Toolbar } from "@/features/editor/components/toolbar"
import { useEditor } from "@/features/editor/hooks/use-editor"

export const Editor = () => {
  const { init } = useEditor()

  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    })

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    })

    return () => {
      canvas.dispose()
    }
  }, [init])

  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar />
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar />
          <div className="h-full flex-1 bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
        </main>
      </div>
    </div>
  )
}
