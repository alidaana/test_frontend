import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

const Table = (props) => {
  const columns = [
    {
      name: "image",
      selector: "image",
      sortable: false,
      grow: 2,
    },
    {
      name: "make",
      selector: "make",
      sortable: true,
      grow: 2,
    },
    {
      name: "model",
      selector: "model",
      sortable: true,
      hide: "sm",
    },
    {
      name: "year",
      selector: "year",
      sortable: true,
    },
    {
      name: "description",
      selector: "description",
      sortable: true,
      hide: "md",
    },
    {
      name: "updated_at",
      selector: "updated_at",
      sortable: true,
      hide: "md",
    },
    {
      name: "Buttons",
      button: true,
      cell: (row) => (
        <>
          <button
            onClick={() =>
              props.onEdit(
                row.id,
                row.make,
                row.model,
                row.description,
                row.year
              )
            }
            style={{ marginRight: "5px" }}
          >
            Edit
          </button>
          <button onClick={() => props.onDelete(row.id)}>Delete</button>
        </>
      ),
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title="Vehicles"
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;
