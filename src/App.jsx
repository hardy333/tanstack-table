import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import data from "./data/data.json";

import { columns } from "./constants/columns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableCell from "./components/TableCell";


import 'tippy.js/dist/tippy.css'; // optional

const resData = data;
// const resData = [...data, ...data, ...data, ...data, ...data, ...data]

function App() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  // console.log({columnFilters})
  
  
  const table = useReactTable({
    columns: columns,
    data: resData,
    columnResizeMode: "onChange",
    state: {
      columnVisibility,
      globalFilter: filtering,
      columnFilters: columnFilters,
    },
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    // Pagination
    // visibility
    onColumnVisibilityChange: setColumnVisibility,
    // Sorting
    getSortedRowModel: getSortedRowModel(),
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

    table.setColumnSizing(collSizeObj);
  };

  const changeHeight = () => {
    const tr = document.querySelector("tr[dataTableId='4']");
    if (!tr) return;
    const styles = getComputedStyle(tr);
    const height = styles.getPropertyValue("height");
    if (height === "100px") {
      tr.style.height = "50px";
    } else {
      tr.style.height = "100px";
    }
  };

  const [showingInputs, setShowingInputs] = useState(true);
  const toggleInputs = () => {
    setShowingInputs(!showingInputs);
    document.querySelectorAll("thead input").forEach((input) => {
      input.style.display = showingInputs ? "none" : "block";
    });
  };

  // console.log({ columnFilters });

  useEffect(() => {
    // console.log(table.getAllColumns()[1].setFilterValue("teodora"))
    // setColumnFilters(prev => {
    //   return [{id: "first_name", value: "elna"}]
    // })
  }, []);

 
  const tableWrapperRef = useRef()

  useLayoutEffect(() => {

    // console.log("useLayout")
    // console.log(tableWrapperRef.current)
    // tableWrapperRef.current.style.background = "red"
    // const width = tableWrapperRef.current.clientWidth
    // console.log({width})
    
  },[])

  useEffect(() => {
    document.body.addEventListener("dblclick", () => {
      // table.resetColumnSizing()

      const obj = {}

      const sizeObj = table.getAllLeafColumns().map(coll => {
        // console.log({coll})
  
  
        return {
          id: coll.id,
          size: 200
        }
        
      })
  
      // console.log(sizeObj)

      sizeObj.forEach(cell => {
        obj[cell.id] = 200
      })

      console.log({obj})
  
  
      table.setColumnSizing(obj)
  console.log("sss", table.options.state.columnSizing)

      
      
    })

   
    // table.setColumnSizingInfo()


    
  },[])
  console.log(table.getAllColumns())
  // console.log({columnVisibility})

  return (
    <>

    <span style={{fontSize: "16px"}}>a</span>
    <span style={{fontSize: "14px"}}>b</span>
    <span style={{fontSize: "14px"}}>b</span>
    <span style={{fontSize: "14px"}}>c</span>
    <span style={{fontSize: "14px"}}>d</span>
    <span style={{fontSize: "14px"}}>e</span>
    <span style={{fontSize: "14px"}}>f</span>
    <span style={{fontSize: "14px"}}>g</span>
    <span style={{fontSize: "14px"}}>h</span>
    <span style={{fontSize: "14px"}}>K</span>
    <span style={{fontSize: "14px"}}>A</span>
      <div className="resize-container">
        <div className="resize-fixed-width-container">
          <div className="resize-text">
            HelloHelloskjh2222222222222222Hellodkjdkhdkjhd
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={handleClick}>Click</button>
        <button onClick={changeHeight}>Chnage Height</button>
        <button onClick={toggleInputs}>toggle inputs</button>
        <input
          type="text"
          placeholder="ssss"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />

        <div>
          <p>page Index - {table.options.state.pagination.pageIndex + 1} </p>
          <p>total pages - {table.getPageCount()}</p>
        </div>

        <div
          className="resize-column-box"
          onMouseDown={table
            .getCenterHeaderGroups()[0]
            .headers.find((header) => header.id === "email")
            .getResizeHandler()}
          onTouchStart={table
            .getCenterHeaderGroups()[0]
            .headers.find((header) => header.id === "email")
            .getResizeHandler()}
        ></div>
      </div>
      <div className="checkbox-container">
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

                      let invisibleCollCount = 0;

                      for (let x in columnVisibility) {
                        if (columnVisibility[x] === false) {
                          invisibleCollCount++;
                        }
                      }
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
      </div>
      <div className="table-container">
        <div className="table-wrapper" ref={tableWrapperRef}>
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

                      return (
                        <th
                          key={header.id}
                          colSpan={1}
                          style={{
                            width: header.getSize(),
                            // minWidth: header.getSize(),
                          }}
                        >
                          {/* Text Content */}
                          {/* Text Content */}
                          <div
                            className="th-text-container"
                            onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : () => {}}
                          >
                            <div className="th-text resize-text">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            {
                            {
                              asc: <span className="th-sort-icon">🔼</span>,
                              desc:  <span className="th-sort-icon">🔽</span> ,
                            }[header.column.getIsSorted()]
                          }
                          </div>


                          {/* Resizing */}
                          {/* Resizing */}
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

                          {/* Filtering */}
                          {/* Filtering */}
                          <input
                            type="text"
                            value={header.column.getFilterValue() || ""}
                            onChange={(e) => {
                              // console.log(
                              //   "column",
                              //   header.column.getCanFilter()
                              // );
                              // console.log(
                              //   "global",
                              //   header.column.getCanGlobalFilter()
                              // );
                              if (header.column.id === "id") {
                                header.column.setFilterValue(e.target.value);
                              } else {
                                header.column.setFilterValue(e.target.value);
                              }
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
                  <tr dataTableId={index} key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                      <TableCell flexRender={flexRender} cell={cell}/>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* table Wrapper End */}

        <section className="table-pagination">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            {"<<"}
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            {">>"}
          </button>
        </section>
      </div>
      {/* Table Container End */}
    </>
  );
}

export default App;
