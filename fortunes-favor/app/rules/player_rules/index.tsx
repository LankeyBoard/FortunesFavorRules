import Layout from "@/app/components/layout";
import type { ReactElement } from "react";

function Page(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Page;
