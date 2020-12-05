const formatedDate = (d) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

export const sorting = (arr = []) => arr.slice().sort((a, b) => a.seq - b.seq);

export const classHelper = (bC, c) => `${bC}-${c}`;

export default formatedDate;
