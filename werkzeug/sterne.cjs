// Erzeugt die Sternenfelder img/sterne-*.svg (fester Zufall, damit das Ergebnis gleich bleibt). Aufruf: node werkzeug/sterne.cjs
const fs = require("fs"), path = require("path");
let seed = 20261123; const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
const W = 1600, H = 1000;
const star4 = (x, y, r) => { const k = .14; return `M${x} ${y - r}C${x + r * k} ${y - r * k} ${x + r * k} ${y - r * k} ${x + r} ${y}C${x + r * k} ${y + r * k} ${x + r * k} ${y + r * k} ${x} ${y + r}C${x - r * k} ${y + r * k} ${x - r * k} ${y + r * k} ${x - r} ${y}C${x - r * k} ${y - r * k} ${x - r * k} ${y - r * k} ${x} ${y - r}Z`; };
function field(n, rMin, rMax, oMin, oMax, sparks, color) {
  let dots = "", sp = "";
  for (let i = 0; i < n; i++) { const x = (rnd() * W).toFixed(1), y = (rnd() * H * .82).toFixed(1), r = (rMin + rnd() * (rMax - rMin)).toFixed(2), o = (oMin + rnd() * (oMax - oMin)).toFixed(2); dots += `<circle cx="${x}" cy="${y}" r="${r}" opacity="${o}"/>`; }
  for (let i = 0; i < sparks; i++) { const x = +(rnd() * W).toFixed(1), y = +(rnd() * H * .7).toFixed(1), r = +(3 + rnd() * 3).toFixed(1); sp += `<path d="${star4(x, y, r)}" opacity="${(.55 + rnd() * .4).toFixed(2)}"/>`; }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><g fill="${color}">${dots}${sp}</g></svg>\n`;
}
const out = f => path.join(__dirname, "..", "img", f);
fs.writeFileSync(out("sterne-1.svg"), field(170, .5, 1.1, .25, .8, 0, "#F4F8FF"));
fs.writeFileSync(out("sterne-2.svg"), field(46, .9, 1.6, .5, 1, 7, "#F4F8FF"));
seed = 777; fs.writeFileSync(out("sterne-hell.svg"), field(60, .7, 1.3, .25, .55, 4, "#C9934A"));
console.log("Sterne erzeugt");
