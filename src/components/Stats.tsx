const Stats = () => {
  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "5,000+", label: "Service Providers" },
    { number: "100+", label: "Cities Covered" },
    { number: "4.8★", label: "Average Rating" }
  ];

  return (
    <section className="py-20 bg-gradient-primary text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;