const renderBenefitChips = (benefits: any[] = []) => {
  return benefits.map((benefit) => {
    let chipClass = "";
    const name = benefit.alias;
    if (name === "Sponsor") {
      chipClass = "border-yellow-400 text-yellow-400";
    } else if (name === "Beta Tester") {
      chipClass = "border-cyan-400 text-cyan-400";
    } else if (name === "Recruiter") {
      chipClass = "border-purple-400 text-purple-400";
    }
    return (
      <span
        key={benefit.id || name}
        className={`bg-transparent border-2 ${chipClass} px-3 py-1 rounded-full text-sm font-medium`}
      >
        {name}
      </span>
    );
  });
};

export default renderBenefitChips;