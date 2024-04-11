import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentData = {
    amount: 0,
    currency: '',
    itemName: '',
    itemPrice: 0,
    itemQuantity: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  };

  constructor(private paymentService: PaymentService) { }

  submitPayment() {
    const orderRequest = {
      amount: this.paymentData.amount,
      currency: this.paymentData.currency,
      lineItems: [{
        name: this.paymentData.itemName,
        unitPrice: this.paymentData.itemPrice,
        quantity: this.paymentData.itemQuantity
      }],
      customerInfo: {
        name: this.paymentData.customerName,
        email: this.paymentData.customerEmail,
        phone: this.paymentData.customerPhone
      }
    };

    this.paymentService.createPaymentLink(orderRequest).subscribe({
      next: (response) => {
        console.log('Link de pago creado:', response);
        // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear el link de pago:', error);
        // Manejar el error, posiblemente mostrando un mensaje al usuario
      }
    });
  }
}
