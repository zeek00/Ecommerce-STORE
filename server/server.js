const express = require("express");
const app = express();
app.disable("x-powered-by");

// Import express-session below:
const session = require("express-session")
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
