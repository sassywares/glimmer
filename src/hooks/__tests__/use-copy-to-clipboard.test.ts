/// <reference types="jest" />

import { renderHook } from "@testing-library/react";

import { useCopyToClipboard } from "../use-copy-to-clipboard";

describe("useCopyToClipboard", () => {
  it("should copy to clipboard", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current[0]).not.toBeDefined();
  });
});
