import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

// Rota para criar um produto
router.post('/', (req, res) => productController.createProduct(req, res));

// Rota para listar todos os produtos
router.get('/', (req, res) => productController.getAllProducts(req, res));

// Rota para obter um produto pelo ID
router.get('/:id', (req, res) => productController.getProductById(req, res));

// Rota para atualizar um produto pelo ID
router.put('/:id', (req, res) => productController.updateProduct(req, res));

// Rota para deletar um produto pelo ID
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
