const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('Hello World! Built and deployed via Jenkins Pipeline!');
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
