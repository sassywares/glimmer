import "@testing-library/jest-dom";
import { Separator } from "./separator.component";

import { render } from "@testing-library/react";

describe("Shared -> Components -> Separator", () => {
  it("renders the children between 2 separators", () => {
    const { getByText, getAllByRole } = render(<Separator>children</Separator>);

    expect(getByText("children")).toBeInTheDocument();
    expect(getAllByRole("separator")).toHaveLength(2);
  });
});
