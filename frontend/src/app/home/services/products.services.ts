import { HttpClient } from "@angular/common/http";
import { Product } from "../models/products.model";
import { Observable, map } from "rxjs";
import { environment as env } from '../../../environments/environments';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private imageBaseUrl: string = 'http://127.0.0.1:8000/storage'

    constructor(private http: HttpClient) { }

    getProducts(page: number = 1, perPage: number = 10): Observable<any> {
        return this.http.get<any>(`${env.url_api}/products?page=${page}&per_page=${perPage}`);
    }

    getImageUrl(imagePath: string): string {
        return `${this.imageBaseUrl}/${imagePath}`;
    }
}