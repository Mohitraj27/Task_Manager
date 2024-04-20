import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  readData: any;
  successmsg: any | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    // Check for user authentication
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please Login First!');
      window.location.href = '/login';
      return;
    }

    this.getAllData();
  }

  deleteID(id: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please Login First!');
      window.location.href = '/login';
      return;
    }

    this.service.deleteData(id).subscribe(
      (res) => {
        console.log(res, 'deleteres==>');
        this.successmsg = res.message;
        //Filters out deleted data from UI
        this.readData = this.readData.filter((item: any) => item.id !== id);

        this.getAllData();
        //Checks if the last non-first page becomes empty after deletion.
        if (
          this.readData.length % this.itemsPerPage === 0 &&
          this.currentPage > 1
        ) {
          this.currentPage--; // Move to previous page
        }
      },
      (error) => {
        console.error(error);

        // Handle specific error messages
        this.successmsg = null;
        this.closedeleteAlert();
        console.error('Error occurred while deleting data:', error);
      }
    );
  }

  getAllData() {
    this.service.getAllData().subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
    });
  }

  closedeleteAlert() {
    this.successmsg = null;
  }

  get totalPages(): number {
    if (this.readData) {
      return Math.ceil(this.readData.length / this.itemsPerPage);
    } else {
      return 0;
    }
  }

  // to display paginated data.
  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    if (this.readData) {
      return this.readData.slice(startIndex, startIndex + this.itemsPerPage);
    } else {
      return [];
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
