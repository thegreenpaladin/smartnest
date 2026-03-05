export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">About SmartNest</p>
        <h1 className="text-5xl font-serif">Designing practical tech for modern homes.</h1>
      </header>

      <section className="grid md:grid-cols-2 gap-8 text-neutral-600 leading-7">
        <p>
          SmartNest curates efficient gadgets that solve real day-to-day problems — from ambient lighting and portable power to workspace comfort.
          Every product in our catalog is selected for utility, durability, and clean aesthetic.
        </p>
        <p>
          We are building an ecommerce experience where discovery feels premium and checkout feels effortless. Use your optional account to track orders,
          or browse anonymously and shop at your own pace.
        </p>
      </section>
    </div>
  );
}
