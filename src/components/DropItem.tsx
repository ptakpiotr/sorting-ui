import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { AcceptedType } from "../Types";

function DropItem() {
  const [num, setNum] = useState<number>(0);
  const [_, dragRef] = useDrag({
    type: AcceptedType,
    item: {
      num,
    },
    end: () => {
      setNum(0);
    },
  });
  return (
    <div ref={dragRef}>
      <input
        type="number"
        placeholder="Number"
        min="-15"
        step="1"
        max="50"
        value={num}
        onChange={(e) => {
          setNum(parseInt(e.target.value));
        }}
        className={"drop-item"}
      />
    </div>
  );
}

export default DropItem;
