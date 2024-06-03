import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Campaign } from '../model/campaign';

@Component({
  selector: 'app-edit-campaign',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogClose,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './edit-campaign.component.html',
  styleUrl: './edit-campaign.component.scss',
})
export class EditCampaignComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Campaign) {
    console.log(data);
  }
  dialogRef = inject(MatDialogRef<EditCampaignComponent>);

  editCampaignForm = new FormGroup({
    campaignTitle: new FormControl(
      this.data.campaignTitle,
      Validators.required
    ),
    campaignDescription: new FormControl(
      this.data.campaignDescription,
      Validators.required
    ),
  });

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  save() {
    const updatedCampaign: Campaign = {
      ...this.data,
      campaignTitle: this.editCampaignForm.value.campaignTitle ?? '',
      campaignDescription:
        this.editCampaignForm.value.campaignDescription ?? '',
    };

    this.dialogRef.close(updatedCampaign);
  }
}
