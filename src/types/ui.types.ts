/**
 * Shared UI Types
 * Common types used across UI components
 */

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardShadow = "none" | "sm" | "md" | "lg";
export type CardRounded = "none" | "sm" | "md" | "lg" | "xl";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BaseComponentProps {
  class?: string;
  id?: string;
}
