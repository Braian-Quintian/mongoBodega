import express from 'express';

//Aquí es donde van los ROUTERS
const app = express();
app.use(express.json());
app.use((err, res) => {
    handleInternalServerError(err, res);
});
export default app;