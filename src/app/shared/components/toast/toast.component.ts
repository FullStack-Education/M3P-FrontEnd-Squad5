import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { Toast } from 'app/shared/interfaces/toast.interface';
import { ToastService } from 'app/shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];

  private toastSubscription: Subscription;
  private toastsUpdatedSubscription: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.toastState.subscribe(
      (toast: Toast) => {
        this.toasts = this.toastService.getToasts();
        setTimeout(() => this.removeToast(toast), 5000);
      }
    );
    this.toastsUpdatedSubscription = this.toastService.toastsUpdated.subscribe(
      (updatedToasts: Toast[]) => {
        this.toasts = updatedToasts;
      }
    );
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
    if (this.toastsUpdatedSubscription) {
      this.toastsUpdatedSubscription.unsubscribe();
    }
  }

  removeToast = (toast: Toast) => this.toastService.removeToast(toast);
}
