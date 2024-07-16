import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/products.services';

@Component({
  selector: 'app-home-main-view',
  templateUrl: './home-main-view.component.html',
  styleUrl: './home-main-view.component.css'
})
export class HomeMainViewComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalProducts: number = 0; // Total de productos
  perPage: number = 10; // Productos por página

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage, this.perPage).subscribe((response: any) => {
      this.products = response.data.map((product: { product_image: string; }) => ({
        ...product,
        product_image: this.productService.getImageUrl(product.product_image)
      }));
      this.totalPages = response.last_page; // Total de páginas
      this.totalProducts = response.total; // Total de productos
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  updatePerPage(newPerPage: number) {
    this.perPage = newPerPage;
    this.currentPage = 1; // Reinicia a la primera página
    this.loadProducts();
  }
  openQRCode() {
    const modal = document.getElementById('qrModal');
    if (modal) {
      modal.classList.add('show'); // Mostrar el modal
      modal.style.display = 'block'; // Asegúrate de que el modal se muestre
    }
  }

  closeQRCode() {
    const modal = document.getElementById('qrModal');
    if (modal) {
      modal.classList.remove('show'); // Ocultar el modal
      modal.style.display = 'none'; // Asegúrate de ocultarlo
    }
  }
}