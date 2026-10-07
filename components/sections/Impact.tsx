import SavingsChart from "../SavingsChart";
import SectionHeader from "../SectionHeader";

export default function Impact() {
  return (
    <section id="effect" aria-labelledby="impact-title" className="bg-surface px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          id="impact-title"
          eyebrow="The effect over time"
          title={
            <>
              Small changes.
              <br />
              Big volume.
            </>
          }
          intro="A small saving repeats with every unit. Over time, it adds up. Find many, and they stack."
        />

        <div data-reveal className="mt-14 md:mt-20">
          <SavingsChart />
        </div>
      </div>
    </section>
  );
}
