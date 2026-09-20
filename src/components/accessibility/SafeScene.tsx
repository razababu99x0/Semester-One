import React from "react";

/** Keeps the book usable if WebGL is unavailable or a 3D scene fails. */
export class SafeScene extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    console.warn("3D scene disabled:", err);
  }
  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SafeScene;
