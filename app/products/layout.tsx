export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 md:py-0 ">
      <div className="inline-block text-center">{children}</div>
    </section>
  );
}
