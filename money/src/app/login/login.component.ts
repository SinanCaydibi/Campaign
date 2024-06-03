import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule,CommonModule,MatSnackBarModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  userForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),

  });
  router = inject(Router);
  snackbar=inject(MatSnackBar)
  horizantalPosition:MatSnackBarHorizontalPosition='right';
  veriticalPositon:MatSnackBarVerticalPosition='bottom';

  showAlert(message: string, action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition:this.horizantalPosition,
      verticalPosition:this.veriticalPositon,
      duration: 2000,
      panelClass:'errorAlert'
    });
  }


  login() {
    const validUsername = 'moneytolia';
    const validPassword = 'm2020';
    if (this.userForm.valid) {
      const { username, password } = this.userForm.value;
      if (username === validUsername && password === validPassword) {
        localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
        this.router.navigate(['/dashboard']);

      } else {
       this.showAlert('Sisteme kayıtlı kullanıcı bulunamadı!', '')


      }
    }
  }
}
