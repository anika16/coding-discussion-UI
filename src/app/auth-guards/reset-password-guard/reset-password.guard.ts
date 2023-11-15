import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard  implements CanActivate {

  constructor(private router: Router, private snackBar: MatSnackBar){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    debugger
    if(!StorageService.getOtpValidated()){
      this.router.navigateByUrl('login');
      this.snackBar.open(
        "You have to validate OTP first", "Close",
        {duration: 5000}
      );
      return false;
    }
    return true;
  }
}
