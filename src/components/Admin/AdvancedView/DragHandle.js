// import { DragIconWrapper } from "../styles";
// import { ReactComponent as DragHandleIcon } from "./drag_handle-black-18dp.svg";
import React from "react";
import { DragHandle as DragHandleIcon } from '@mui/icons-material'

export function DragHandle(props) {
  return (
    <div style={{ display: 'inline-block' }} {...props}>
      <DragHandleIcon />
    </div>
  );
}
