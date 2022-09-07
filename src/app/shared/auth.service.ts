import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private router: Router) {
  }

  /**
   * Login Method
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  /**
   * Register Method
   * @param email
   * @param password
   */
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration Successful');
      this.router.navigate(['/login']);

    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }
}
