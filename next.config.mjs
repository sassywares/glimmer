import createNextMdxPlugin from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createNextMdxPlugin();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withNextIntl(withMDX(nextConfig));
