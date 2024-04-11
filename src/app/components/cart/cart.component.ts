import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  myCart$ = this.storeService.myCart$;
  viewCart: boolean = false;
  showPaymentForm: boolean = false; // Nuevo estado para mostrar/ocultar el formulario de pago
  paymentInfo = { // Objeto para recoger la información del formulario de pago
    name: '',
    email: '',
    phone: ''
  };

  constructor(private storeService: StoreService, private paymentService: PaymentService) { }

  updateUnits(operation: string, id: string) {
  }

  totalProduct(price: number, units: number): number {
    return price * units;
  }
  

  deleteProduct(id: string): void {
  }

  totalCart(): number {
    // Asumiendo que `this.storeService.totalCart()` calcula el total y siempre retorna un número.
    return this.storeService.totalCart();
  }

  proceedToPayment(): void {
    // Cambio: En lugar de directamente generar el link de pago,
    // ahora mostramos el formulario de pago para que el usuario pueda introducir información adicional
    this.showPaymentForm = true;
  }

  submitPaymentInfo(): void {
    const total = this.totalCart(); // Obtenemos el total del carrito

    // Aquí, incluimos la información adicional en la solicitud al servicio de pago
    this.paymentService.createPaymentLink({
      ...this.paymentInfo, // Desestructuramos paymentInfo para incluir name, email, etc.
      amount: total // Añadimos el total del carrito
    }).subscribe({
      next: (response) => {
        // Manejar la respuesta, por ejemplo, abriendo el link de pago para el usuario
        window.open(response.paymentLink, '_blank');
        this.showPaymentForm = false; // Ocultamos el formulario después de enviar la información
      },
      error: (error) => {
        console.error('Error al crear el link de pago:', error);
        // Aquí podrías manejar el error, posiblemente mostrando un mensaje al usuario
      }
    });
  }
}
