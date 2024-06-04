const express = require('express');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const followRouter = require('./routes/followRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const brandRouter = require('./routes/brandRoutes');
const modelRouter = require('./routes/modelRoutes');
const capacityRouter = require('./routes/capacityRoutes');
const colorRouter = require('./routes/colorRoutes');
const versionRouter = require('./routes/versionRoutes');
const tagCategoryRouter = require('./routes/tagCategory');
const tagRouter = require('./routes/tagRoutes');

const app = express();

app.use(express.json());
app.use(cors())
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/follows', followRouter);
app.use('/brands', brandRouter)
app.use('/models', modelRouter)
app.use('/capacities', capacityRouter)
app.use('/colors', colorRouter)
app.use('/versions', versionRouter)
app.use('/tagCategories', tagCategoryRouter)
app.use('/tags', tagRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
