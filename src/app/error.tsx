"use client";

import Error from "next/error";

export default function RootError() {
  return <Error statusCode={400} />;
}
