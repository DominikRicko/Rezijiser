import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from '../_services/export.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  exportTypes = ['excel', 'pdf'];
  datePipe = new DatePipe('en-US');
  formControl: FormGroup = new FormGroup({
    startingDate: new FormControl('', [Validators.required]),
    endingDate: new FormControl('', [Validators.required]),
    exportType: new FormControl('', [Validators.required]),
  });

  startingDate: string;
  endingDate: string;
  exportType: string;

  constructor(
    private exportService: ExportService,
    public dialogRef: MatDialogRef<ExportComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.exportService
      .getExport({
        startingDate: this.formatDate(this.startingDate),
        endingDate: this.formatDate(this.endingDate),
        exportType: this.exportType,
      })
      .subscribe((response) => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([response.body]);

        console.log(response);
        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = data;
        link.download = (this.exportType === 'pdf')?('export.pdf'):('export.xlsx'); //Cannot get content-disposition header...
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(function() {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });

    //   this.billService.updateBill(newBill, this.bill.type).subscribe(
    //     (data) => {
    //     this.router.navigate(['detail'], { queryParams: { type: this.bill.type }}); },
    //     (error) => {
    //       this.snackBar.open('Greška prilikom ažuriranja računa.', null, {duration: 5000});
    //       },
    //     () => {
    //       this.snackBar.open('Uspješno ažuriran račun.', null, {duration: 5000});
    //       this.dialogRef.close();
    // }
  }

  cancel() {
    this.dialogRef.close();
  }

  private formatDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
