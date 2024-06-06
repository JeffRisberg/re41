import React, { createContext, useContext, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';


const BUTTON_STYLE = {
  display: "inline-block",
  padding: "4px 10px",
  background: "transparent",
  border: "0"
};

const HEADER_STYLE = {
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "1px solid"
};

const EntityNameContext = createContext();
const SuggestedQueriesContext = createContext();

function Button({ children }) { // component
  return <button style={BUTTON_STYLE}>{children}</button>;
}

function UserButton() { // component
  const entityName = useContext(EntityNameContext);
  return <Button>👤 {entityName}</Button>;
}

function Header() { // component
  return (
    <header style={HEADER_STYLE}>
      <Button>RE41</Button>
      <Button>Search</Button>
      <Button>Profile</Button>
      <UserButton />
    </header>
  );
}

function SearchResult() { // component
  const entityName = useContext(EntityNameContext);
  const suggestedQueries = useContext(SuggestedQueriesContext);

  const rows = suggestedQueries.map((query, index) => {
    return { "id": index, "query": query, "result": "The steps for resetting your password" };
  });

  const columns = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "query", headerName: "Query", width: 350 },
    { field: "result", headerName: "Result", width: 500 }
  ];

  return (
    <section>
      <h1>Queries against {entityName}</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </section>
  );
}

function SearchResults() { // component
  return (
    <main>
      <SearchResult />
    </main>
  );
}

function Dashboard({ entityName }) {
  return (
    <EntityNameContext.Provider value={entityName}> // this builds a new provider, we don't change an existing one
      <Header />
      <SearchResults />
    </EntityNameContext.Provider>
  );
}

function AdminDashboard() { // primary component
  const [entityName, setEntityName] = useState("Tickets");

  return (
    <>
      <select value={entityName} onChange={(evt) => setEntityName(evt.target.value)}>
        <option>Tickets</option>
        <option>Knowledge Articles</option>
        <option>Users</option>
        <option>Intents</option>
        <option>Requests</option>
      </select>
      <Dashboard entityName={entityName} />
    </>
  );
}

function App() { // top-level component
  const suggestedQueries = [
    "Are there any blockers in the Alaska release?",
    "What PRs are open for Brazil release?",
    "Any high priority tickets for Cambodia?"
  ];
  return (
    <SuggestedQueriesContext.Provider value={suggestedQueries}>
      <AdminDashboard />
    </SuggestedQueriesContext.Provider>
  );
}

export default App;
