"use client";

import {
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

/* A horizontal rail you can drag with a mouse. Touch and trackpads already
 * scroll an overflow-x container; a mouse only gets the scrollbar, so this
 * turns press-and-drag into scrollLeft. A drag past a few pixels swallows the
 * click that would otherwise land on whatever is under the pointer. */
export function DragRail({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; left: number } | null>(null);
  const dragged = useRef(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !rail.current) return;
    start.current = { x: e.clientX, left: rail.current.scrollLeft };
    dragged.current = false;
    rail.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!start.current || !rail.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > 4) dragged.current = true;
    rail.current.scrollLeft = start.current.left - dx;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    rail.current?.releasePointerCapture(e.pointerId);
    start.current = null;
  };
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragged.current) return;
    e.preventDefault();
    e.stopPropagation();
    dragged.current = false;
  };

  return (
    <div
      ref={rail}
      className={`cursor-grab select-none active:cursor-grabbing [&_img]:pointer-events-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
