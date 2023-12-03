import React from "react";

const TableCell = ({ cell, flexRender}) => {
  return (
    <td key={cell.id} style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize() }}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export default TableCell;
