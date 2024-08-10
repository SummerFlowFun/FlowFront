export const getColor = (energy: number) => {
  const colors = [
    { level: 0, color: "#8CA4EE" },
    { level: 25, color: "#55C2BC" },
    { level: 50, color: "#FFB751" },
    { level: 60, color: "#F16E1E" },
    { level: 70, color: "#F1634F" },
    { level: 100, color: "#F1634F" },
  ];

  for (let i = 1; i < colors.length; i++) {
    if (energy <= colors[i].level) {
      const prevColor = colors[i - 1];
      const nextColor = colors[i];
      const ratio =
        (energy - prevColor.level) / (nextColor.level - prevColor.level);

      const r = Math.round(
        parseInt(prevColor.color.slice(1, 3), 16) * (1 - ratio) +
          parseInt(nextColor.color.slice(1, 3), 16) * ratio
      );
      const g = Math.round(
        parseInt(prevColor.color.slice(3, 5), 16) * (1 - ratio) +
          parseInt(nextColor.color.slice(3, 5), 16) * ratio
      );
      const b = Math.round(
        parseInt(prevColor.color.slice(5, 7), 16) * (1 - ratio) +
          parseInt(nextColor.color.slice(5, 7), 16) * ratio
      );

      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return colors[colors.length - 1].color;
};
