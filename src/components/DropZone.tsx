import React from "react";
import { useDrop } from "react-dnd";
import shallow from "zustand/shallow";
import * as yup from "yup";

import { AcceptedType } from "../Types";
import { useResultsStore } from "../App";

function DropZone() {
  const { numbers, setNumbers } = useResultsStore(
    (st: any) => ({ setNumbers: st.setNumbers, numbers: st.numbers }),
    shallow
  );

  const [_, dropRef] = useDrop({
    accept: AcceptedType,
    drop(
      item: {
        num: number;
      },
      monitor
    ) {
      schema.isValid(item).then((valid) => {
        if (valid) {
          setNumbers([...numbers, item.num]);
        }
      });
    },
  });

  const schema = yup.object({
    num: yup.number().min(-15).max(50).required(),
  });
  return <div ref={dropRef}>DropZone</div>;
}

export default DropZone;
