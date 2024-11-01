import { EventEmitter, Injectable } from '@angular/core';
import { Toast } from '../interfaces/toast.interface';
import { Subject } from 'rxjs';
import { ToastType } from '../enums/toast-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toastState = this.toastSubject.asObservable();
  private toasts: Toast[] = [];
  toastsUpdated: EventEmitter<Toast[]> = new EventEmitter();

  showToast(type: ToastType, title: string, message: string) {
    if (this.toasts.length >= 5) {
      this.removeToast(this.toasts[0]);
      //this.toasts.shift();
    }
    const icon = this.icon(type);

    let toast: Toast = {
      type,
      title,
      message,
      icon,
      enter: true,
      leave: false,
      show: true,
    };
    this.toasts.push(toast);
    this.toastSubject.next(toast);
    this.toastsUpdated.emit(this.toasts);
  }
  removeToast(toast: Toast) {
    toast.leave = true;
    setTimeout(() => {
      toast.show = false;
      this.toasts = this.toasts.filter((t) => t !== toast);
      this.toastsUpdated.emit(this.toasts);
    }, 300);
  }

  getToasts = (): Toast[] => this.toasts;
  private icon(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return 'heroCheckCircle';
      case ToastType.ERROR:
        return 'heroXCircle';
      case ToastType.WARNING:
        return 'heroExclamationTriangle';
      case ToastType.INFO:
        return 'heroExclamationCircle';
      default:
        return 'heroExclamationCircle';
    }
  }
}
