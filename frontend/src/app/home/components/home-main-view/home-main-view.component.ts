import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/products.services';
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-main-view',
  templateUrl: './home-main-view.component.html',
  styleUrl: './home-main-view.component.css'
})
export class HomeMainViewComponent implements OnInit {
  products: any[] = [];
  totalProducts: number = 0;
  perPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  selectedImage: string;
  isModalOpen: boolean = false;
  contactForm: FormGroup;
  submitted = false;
  showModal = false;

  constructor(private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
   }

  ngOnInit(): void {
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

  toggleCard(product: any): void {
    product.isFlipped = !product.isFlipped;
  }

  updatePerPage(perPage: number): void {
    this.perPage = perPage;
    this.loadProducts();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
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
  openModalImage(image: string) {
    this.selectedImage = image;
    this.isModalOpen = true;
  }

  closeModalImage() {
    this.isModalOpen = false;
  }

  // Contact
  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      this.saveContactData(contactData);
      this.submitted = true;
    }
  }

  saveContactData(data: any) {
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(data);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('Contacts saved in localStorage:', contacts);
  }
}