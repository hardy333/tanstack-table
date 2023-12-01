const width = 1160/7 

export const columns = [
    {
        accessorKey: 'id',
        header: "Id",
      
        
        // minSize: 350,
        // maxSize: 400
        size: width ,
        minSize: width,
        maxSize: 400
    },
    {
        accessorKey: 'first_name',
        header: "First Name",
        size: width,
        minSize: width,
        maxSize: 400

    },
    {
        accessorKey: 'last_name',
        header: "Last Name",
        size: width,
        minSize: width,
        maxSize: 400

    },
    {
        accessorKey: 'email',
        header: "Email",
        size: width,
        minSize: width,
        maxSize: 400,
        cell: (x) => {
            return <span style={{maxWidth: "100px", border:"1px solid red", overflow: "hidden", display: "block"}}>{x.getValue()}</span>
        }

    },
    {
        accessorKey: 'gender',
        header: "Gender 123",
        size: width,
        minSize: width,
        maxSize: 400,
        cell: (x) => {
            return <span style={{color: x.cell.row.original.id %2 === 0 ? "red": "green"}}>{x.getValue()} - {x.cell.row.original.id}</span>
        }

    },
    {
        accessorKey: 'ip_address',
        header: "Ip Adsress",
        size: width,
        minSize: width,
        maxSize: 400

    },
    {
        accessorKey: 'date',
        header: "Date",
        size: width,
        minSize: width,
        maxSize: 400

    },
]