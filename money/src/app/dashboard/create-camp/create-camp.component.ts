import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Campaign } from '../../model/campaign';
@Component({
  selector: 'app-create-camp',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './create-camp.component.html',
  styleUrl: './create-camp.component.scss',
})
export class CreateCampComponent implements OnInit {
  ngOnInit() {
    this.loadCampaigns();
  }

  id = 0;
  today = new Date().toISOString().split('T')[0];
  campaignList: Campaign[] = [];

  campaignForm = new FormGroup({
    campaignTitle: new FormControl('', Validators.required),
    campaignDescription: new FormControl('', Validators.required),
    campaignDate: new FormControl(this.today),
    campaignPuan: new FormControl(0),
  });

  router = inject(Router);
  snackbar = inject(MatSnackBar);
  horizantalPosition: MatSnackBarHorizontalPosition = 'right';
  veriticalPositon: MatSnackBarVerticalPosition = 'bottom';

  showAlert(message: string, action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition: this.horizantalPosition,
      verticalPosition: this.veriticalPositon,
      duration: 2000,
      panelClass: ['createAlert'],
    });
  }

  save() {
    if (this.campaignForm.valid) {
      const newCampaign = this.campaignForm.value as Campaign;
      newCampaign.campaignId = this.id;
      newCampaign.campaignDate = this.today;

      this.campaignList.push(newCampaign); // Add the new campaign once
      console.log(this.campaignList);

      this.saveCampaigns(); // Update local storage

      this.showAlert('Kampanya oluşturuldu.', '');
      this.campaignForm.reset({
        campaignDate: this.today,
        campaignPuan: 0,
      });

      this.id++;
    }
  }

  saveCampaigns() {
    localStorage.setItem('campaignList', JSON.stringify(this.campaignList));
  }

  loadCampaigns() {
    const savedCampaigns = localStorage.getItem('campaignList');
    if (savedCampaigns) {
      this.campaignList = JSON.parse(savedCampaigns);
    }
  }
}
