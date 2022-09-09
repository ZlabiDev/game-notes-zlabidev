import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import firebase from "firebase/compat";
import User = firebase.User;

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
    this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/verify-email']);
      }

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
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  /**
   * Logout Method
   */
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }

  /**
   *
   * @param email
   */
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['verify-email']);
    }, err => {
      alert(err.message);
    });
  }

  private sendEmailForVerification(user: User | null) {
    user?.sendEmailVerification().then((res: any) => {
      this.router.navigate(['verify-email']);
    }, err => {
      alert(err.message + 'Not able to send email to your email address.');
    });
  }
}
