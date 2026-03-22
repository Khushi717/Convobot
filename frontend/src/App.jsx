import { useState } from "react";
import Landing from "./components/Landing";
import ChatUI from "./components/ChatUI";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      {page === "landing" ? (
        <Landing onStart={() => setPage("chat")} />
      ) : (
        <ChatUI />
      )}
    </>
  );
}

export default App;