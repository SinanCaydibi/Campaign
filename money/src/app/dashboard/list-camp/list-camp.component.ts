import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditCampaignComponent } from '../../edit-campaign/edit-campaign.component';
import { Campaign } from '../../model/campaign';
import { log } from 'console';
@Component({
  selector: 'app-list-camp',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],

  templateUrl: './list-camp.component.html',
  styleUrl: './list-camp.component.scss',
})
export class ListCampComponent implements OnInit {
  campaignList: Campaign[] = [];
  ngOnInit() {
    this.loadCampaigns();
  }

  increment(campaign: Campaign) {
    const updatedPuan: Campaign = {
      ...campaign,
      campaignPuan: campaign.campaignPuan + 1,
    };
    const campaignIndex = this.campaignList.findIndex((c) => c === campaign);
    this.campaignList[campaignIndex] = updatedPuan;
    localStorage.setItem('campaignList', JSON.stringify(this.campaignList));
  }
  decrement(campaign: Campaign) {
    const updatedPuan: Campaign = {
      ...campaign,
      campaignPuan: campaign.campaignPuan - 1,
    };
    const campaignIndex = this.campaignList.findIndex((c) => c === campaign);
    this.campaignList[campaignIndex] = updatedPuan;
    localStorage.setItem('campaignList', JSON.stringify(this.campaignList));
  }

  dialog = inject(MatDialog);

  openDialog(campaign: Campaign) {
    const dialogRef = this.dialog.open(EditCampaignComponent, {
      width: '400px',
      data: campaign,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const campaignIndex = this.campaignList.findIndex(
          (c) => c === campaign
        );
        this.campaignList[campaignIndex] = result;
        localStorage.setItem('campaignList', JSON.stringify(this.campaignList));
      }
    });
  }
  loadCampaigns() {
    const savedCampaignsString = localStorage.getItem('campaignList');
    if (savedCampaignsString) {
      try {
        const parsedCampaigns = JSON.parse(savedCampaignsString);
        this.campaignList = parsedCampaigns as Campaign[];
      } catch (error) {
        console.error('Error parsing campaign data from local storage:', error);
        // Handle the error appropriately
      }
    }
  }
}
