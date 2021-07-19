import { AfterViewInit, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-backend-sidebar',
  templateUrl: './backend-sidebar.component.html',
  styleUrls: ['./backend-sidebar.component.css']
})
export class BackendSidebarComponent implements OnInit, AfterViewInit {
  
  userName = '';
  flag = true;
  constructor(private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.userService.user.fullName;
  }

  ngAfterViewInit() {
    
  }

  signOut() {
    this.authService.logout();
  }
  
}
