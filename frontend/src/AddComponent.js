import { useState } from "react";

export default function AddComponent() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Schreiben Sie etwas..."
      />
      <button disabled={text.trim() === ""}>Add</button>
    </div>
  );
}
