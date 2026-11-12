import type { Primitive } from '@/protocol/types'
import { genericAtoms } from './generic'
import { chartAtoms } from './chart'
import { richAtoms } from './rich'

/** Builtin atom registry. Showcase business cards register into the same map. */
export const REGISTRY: Record<string, Primitive> = {
  ...genericAtoms,
  ...chartAtoms,
  ...richAtoms,
}

export function registerComponent(name: string, render: Primitive): void {
  REGISTRY[name] = render
}

export function listComponents(): string[] {
  return Object.keys(REGISTRY).sort()
}
