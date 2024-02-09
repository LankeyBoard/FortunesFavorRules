import lineages_data from "@/public/rules_json/lineages/lineages.json";
import Lineage from "@/app/components/Lineage";
function LineagePage() {
  console.log(lineages_data.list);
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-slate-500 mb-2">
      {lineages_data.list.map((lineage_data) => {
        return <Lineage json={lineage_data} key={lineage_data.slug} />;
      })}
    </div>
  );
}

export default LineagePage;
