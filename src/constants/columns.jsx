import Tippy from "@tippyjs/react";

const width = 1160 / 7 - 5;

export const columns = [
  {
    accessorKey: "id",
    header: "Id 123",
    // accessorFn: (row, index) => {
    //     console.log(row, index)
    //     // return index * 100 + "param"
    //     return index
    //     // return Math.floor(Math.random()*20+2)
    // },

    // minSize: 350,
    // maxSize: 400
    size: width,
    minSize: width,
    maxSize: 400,
    filterFn: "includesString",
    cell: (cell) => {
      return cell.getValue();
    },
    hello: "12222323223Hellooooooooooooooo",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    size: width,
    minSize: width,
    maxSize: 400,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    size: width,
    minSize: width,
    maxSize: 400,
    // accessorFn: (row, index) => {
    //     return index

    // },
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: "Email",
    size: width,
    minSize: width,
    maxSize: 400,
    cell: (x) => {
        console.log({x: x.column.getSize()})

        const width  = x.column.getSize()
        const maxLetterCount = width/9
        console.log({maxLetterCount})
        
        
      return (
        <Tippy content={x.getValue()}
        interactive={true}
        disabled={x.getValue().length >= maxLetterCount ? false: true}
        arrow={true}
        >
          <span
            className="resize-text"
            style={{
              width: "100%",
              border: " ",
              overflow: "hidden",
              display: "block",
            }}
          >
            {x.getValue()}
          </span>
        </Tippy>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender 123",
    size: width,
    minSize: width,
    maxSize: 400,
    cell: (x) => {
      return (
        <span
          style={{ color: x.cell.row.original.id % 2 === 0 ? "red" : "green" }}
        >
          {x.getValue()} - {x.cell.row.original.id}
        </span>
      );
    },
    // enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "ip_address",
    header: "Ip Adsress",
    size: width,
    minSize: width,
    maxSize: 400,
  },
  {
    accessorKey: "date",
    header: "Date",
    size: width,
    minSize: width,
    maxSize: 400,
    accessorFn: (row) => {
      const d = row.date;
      // console.log({d})
      // console.log(new Date(0))

      return new Date(d);
      // return {date: new Date(d), num: Math.floor(Math.random()*20)}
      // return Math.floor(Math.random()*200)
    },

    cell: (cell) => {
      const d = cell.getValue();

      // console.log(d)
      return (
        <span style={{ color: "red" }}>
          {d.getMonth() + 1} - {d.getDate()} - {d.getFullYear()}
        </span>
      );

      // console.log(cell.getValue())

      // return "xslsjlksj" + " " + cell.getValue() + " dsss"
    },
    // sortingFn: "datetime"
  },
];
