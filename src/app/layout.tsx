import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/main-layout";
import { StyledComponentsRegistry } from "@/context/styled-components";
import { GithubDataProvider } from "@/context/github-data";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Databricks",
  description: "Home assignment for FE position.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <StyledComponentsRegistry>
          <GithubDataProvider>
            <MainLayout>{children}</MainLayout>
          </GithubDataProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
