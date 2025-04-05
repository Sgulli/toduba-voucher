import express from "express";
/* routes import */
import userApi from "../../users/users.route";
import productApi from "../../products/products.route";
import orderApi from "../../orders/orders.route";
import authApi from "../../auth/auth.route";
import assetsApi from "../../assets/assets.route";
import pricesApi from "../../prices/prices.route";
import consts from "../../utils/consts";
import { useAuth } from "../../config";

const { basePath } = consts;

const router = express.Router();

/* routes */
router.use(basePath, userApi);
router.use(basePath, useAuth(), productApi);
router.use(basePath, useAuth(), orderApi);
router.use(basePath, authApi);
router.use(basePath, useAuth(), assetsApi);
router.use(basePath, useAuth(), pricesApi);

export default router;
