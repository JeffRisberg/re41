import {createContext, useContext, useState} from "react";

const BUTTON_STYLE = {
    display: "inline-block",
    padding: "4px 10px",
    background: "transparent",
    border: "0",
};

const HEADER_STYLE = {
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "1px solid",
};

const NameContext = createContext();
const DepartmentContext = createContext();

function Button({children}) {
    return <button style={BUTTON_STYLE}>{children}</button>;
}

function UserButton() {
    const name = useContext(NameContext);
    return <Button>👤 {name}</Button>;
}

function Header() {
    return (
        <header style={HEADER_STYLE}>
            <Button>Home</Button>
            <Button>Groups</Button>
            <Button>Profile</Button>
            <UserButton/>
        </header>
    );
}

function Welcome() {
    const name = useContext(NameContext);
    const department = useContext(DepartmentContext);
    return (
        <section>
            <h1>Welcome, {name} of the {department} team!</h1>
        </section>
    );
}

function Main() {
    return (
        <main>
            <Welcome/>
        </main>
    );
}

function Dashboard({name, department}) {
    console.log(department)
    return (
        <NameContext.Provider value={name}>
            <DepartmentContext.Provider value={department}>
                <Header/>
                <Main/>
            </DepartmentContext.Provider>
        </NameContext.Provider>
    );
}

function AdminDashboard() {
    const [user, setUser] = useState("Alice");
    const department = "HR";
    return (
        <>
            <select value={user} onChange={(evt) => setUser(evt.target.value)}>
                <option>Alice</option>
                <option>Bob</option>
                <option>Carol</option>
                <option>Ted</option>
            </select>
            <Dashboard name={user} department={department}/>

        </>
    );
}

function App() {
    return <AdminDashboard/>;
}

export default App;
