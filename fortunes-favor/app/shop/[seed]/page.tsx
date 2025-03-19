import Shop from "@/components/Shop";

export default async function ShopView(props: {
  params: Promise<{ seed: string }>;
}) {
  const params = await props.params;
  return <Shop seed={params.seed} />;
}
