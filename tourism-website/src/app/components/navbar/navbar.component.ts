import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from 'src/app/core/services/destination-service/destination.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private router: Router, private destinationService: DestinationService) {

  }

  ngOnInit(): void {

  }


  verifyIfLoggedIn() {
    const username = localStorage.getItem('username');
    if (username !== null) {
      return true;
    }
    else return false;
  }

  myFunction() {
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  }

  // Close the dropdown menu if the user clicks outside of it
  viewOptions() {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown instanceof HTMLElement && openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('is_superuser');
    this.goToPage('');
  }


  onSearch(event: KeyboardEvent): void {
    this.goToPage('destinations/all')
    const searchTerm = (event.target as HTMLInputElement).value;
    this.destinationService.setSearchTerm(searchTerm);
  }

  isAdmin() {
    const role = localStorage.getItem('is_superuser');
    const isSuperuser = role === 'true';
    if (isSuperuser == true) {
      return true;
    }
    return false;
  }

  goToAdminPage(): void {
    window.open('http://localhost:8000/admin', '_blank');
  }
};


