import { ProductDTO } from "../dtos/product.dto";
import { Product } from '../models/product.model';

export class ProductService {

  // Método para criar um novo produto
  async createProduct(productDto: ProductDTO): Promise<Product> {
    try {
      const product = new Product(productDto);
      return await product.save();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Error creating product: ${errorMessage}`);
    }
  }

  // Método para obter todos os produtos com paginação
  async getAllProducts(page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number }> {
    try {
      // Calcular o número de documentos a serem ignorados com base na página e no limite
      const skip = (page - 1) * limit;

      // Buscar produtos com paginação
      const products = await Product.find().skip(skip).limit(limit);
      
      // Obter o número total de produtos para informar o total de páginas
      const total = await Product.countDocuments();

      return { products, total };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Error fetching products: ${errorMessage}`);
    }
  }

  // Método para obter um produto pelo ID
  async getProductById(productId: string): Promise<Product | null> {
    try {
      return await Product.findById(productId);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Error fetching product by ID: ${errorMessage}`);
    }
  }

  // Método para atualizar um produto pelo ID
  async updateProduct(productId: string, productDto: ProductDTO): Promise<Product | null> {
    try {
      return await Product.findByIdAndUpdate(productId, productDto, { new: true });
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Error updating product: ${errorMessage}`);
    }
  }

  // Método para deletar um produto pelo ID
  async deleteProduct(productId: string): Promise<Product | null> {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Error deleting product: ${errorMessage}`);
    }
  }
}
