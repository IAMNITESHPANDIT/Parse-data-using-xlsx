import { useState } from "react";
import FileUpload from "./components/file-upload/FileUpload";

import Table from "./components/table/Table";

function App() {
  const [flag, setFlag] = useState(false);

  return (
    <div className="App">
      <FileUpload setFlag={setFlag} />
      <Table flag={flag}/>
    </div>
  );
}

export default App;
