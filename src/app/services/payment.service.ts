// En payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = 'http://localhost:8080'; // URL de tu backend

    constructor(private http: HttpClient) { }

    createPaymentLink(paymentInfo: any): Observable<any> {
        // Reemplaza la URL con el endpoint específico en tu backend que maneja la creación del link de pago
        return this.http.post(`${this.apiUrl}/create-payment-link`, paymentInfo);
    }
}
