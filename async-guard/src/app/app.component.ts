import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationDialogService } from './service/confirmation-dialog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ConfirmDialogModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public confirmationDialogService: ConfirmationDialogService) {}
  title = 'async-guard';
}
