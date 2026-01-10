const notes12 = ["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"];

const keys = document.querySelectorAll("#keypad .whiteKey, #keypad .blackKey");

keys.forEach((keyEl, i) => {
  keyEl.classList.add("key");

  const note = notes12[i % notes12.length];

  const old = keyEl.querySelector(".label");
  if (old) old.remove();

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = note;

  keyEl.appendChild(label);
});
