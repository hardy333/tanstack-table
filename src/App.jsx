import { useState } from "react";
import "./App.css";
import data from "./data/data.json";

import { columns } from "./constants/columns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";


const resData = data.slice(0,30)
// const resData = [...data, ...data, ...data, ...data, ...data, ...data]


function App() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [filtering, setFiltering] = useState("")
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    columns: columns,
    data: resData,
    columnResizeMode: "onChange",
    state: {
      columnVisibility,
      globalFilter: filtering,
      columnFilters: columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Filtering
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,

    
    
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

  const handleClick = (visibleColumnCount) => {
    const x = table.getAllColumns();
    const collSizeObj = {};

    x.forEach((coll) => {
      collSizeObj[coll.id] = 1160 / visibleColumnCount - 20;
    });

    console.log({ collSizeObj, length: x.length });
    table.setColumnSizing(collSizeObj);
  };
  
  const changeHeight = () => {
    console.log(222)
    const tr = document.querySelector("tr[dataTableId='4']")
    if(!tr) return 
    const styles = getComputedStyle(tr)
    const height = styles.getPropertyValue("height")
    console.log(height)
    if(height === "100px"){

      tr.style.height = "50px"
    }else{
      tr.style.height = "100px"

    }

  }
  

  return (
    <>
    <div style={{display:"flex",}}>
      <button onClick={handleClick}>Click</button>
      <button onClick={changeHeight}>Chnage Height</button>
      <input type="text" placeholder="ssss" value={filtering} onChange={(e) => setFiltering(e.target.value)}/>

    </div>

      {table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id} className="px-1">
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: (e) => {
                    const handler = column.getToggleVisibilityHandler();
                    const a = handler(e);

                    console.log({ columnVisibility });

                    let invisibleCollCount = 0;

                    for (let x in columnVisibility) {
                      if (columnVisibility[x] === false) {
                        invisibleCollCount++;
                      }
                      console.log({ x });
                    }
                    console.log(e.target.checked);
                    if (e.target.checked === false) {
                      invisibleCollCount++;
                    } else {
                      invisibleCollCount--;
                    }

                    handleClick(
                      table.getAllColumns().length - invisibleCollCount
                    );
                  },
                }}
              />{" "}
              {column.id}
            </label>
          </div>
        );
      })}
      <div className="table-wrapper">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    // console.log("dd", header.size())

                    return (
                      <th
                        key={header.id}
                        colSpan={1}
                        style={{
                          width: header.getSize(),
                          // minWidth: header.getSize(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              header.column.getIsResizing()
                                ? "isResizing"
                                : "notIsResizing"
                            }`,
                          }}
                        />
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr

                dataTableId={index}

                
                 key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
