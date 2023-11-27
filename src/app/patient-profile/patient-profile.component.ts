// patient-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';
import { MedicalHistoryDto } from '../Types/MedicalHistoryDto';
import { MedicalHistoryService } from '../services/MedicalHistroy.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patientDto?: GetPatientByPhoneDTO;
  name: string = '';
  phoneNumber: string = '';
  gender: string = '';
  dateOfBirth: any;
  id: number = 0;
  patientId: string | null = null;
 

  form = new FormGroup({
    previousSurgeries: new FormControl<string>(''),
    other: new FormControl<string>(''),
    hepatitis: new FormControl<string>(''),
    medication: new FormControl<string>(''),
    bloodGroup: new FormControl<string>(''),
    martialStatus: new FormControl<boolean>(false),
    pregnancy: new FormControl<boolean>(false),
    heartDisease: new FormControl<boolean>(false),
    anxityOrPanicDisorder: new FormControl<boolean>(false),
    depression: new FormControl<boolean>(false),
    allergies: new FormControl<boolean>(false),
    smoker: new FormControl<boolean>(false),
    diabetes: new FormControl<boolean>(false),
    highBloodPressure: new FormControl<boolean>(false),
    lowBloodPressure: new FormControl<boolean>(false),
    asthma: new FormControl<boolean>(false),
  });

  constructor(private patientService: PatientService, 
    private medicalHistoryService: MedicalHistoryService, private toast:NgToastService ) {}

  ngOnInit(): void {
    this.patientService.getPatientByPhoneNumber("400200200200").subscribe({
      next: (patient: GetPatientByPhoneDTO) => {
        this.patientDto = patient;
        this.name = patient.name!;
        this.phoneNumber = patient.phoneNumber!;
        this.gender = patient.gender!;
        this.dateOfBirth = patient.dateOfBirth;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      },
    });

    this.medicalHistoryService.getMedicalHistory("400200200200").subscribe({
      next: (medicalHistoryData: MedicalHistoryDto) => {
        this.id = medicalHistoryData.id;
        this.patientId = medicalHistoryData.patientId;

        // Update the form with the fetched medical history data
        this.updateMedicalHistoryForm(medicalHistoryData);

        console.log(medicalHistoryData);
      },
      error: (error) => {
        console.error('Error fetching medical history data:', error);
      },
    });
  }

  // New method to update the form with medical history data
  private updateMedicalHistoryForm(data: MedicalHistoryDto | null): void {
    if (data) {
      this.form.patchValue({
        martialStatus: data.martialStatus,
        pregnancy: data.pregnancy,
        bloodGroup: data.bloodGroup,
        previousSurgeries: data.previousSurgeries,
        medication: data.medication,
        smoker: data.smoker,
        diabetes: data.diabetes,
        highBloodPressure: data.highBloodPressure,
        lowBloodPressure: data.lowBloodPressure,
        asthma: data.asthma,
        hepatitis: data.hepatitis,
        heartDisease: data.heartDisease,
        anxityOrPanicDisorder: data.anxityOrPanicDisorder,
        depression: data.depression,
        allergies: data.allergies,
        other: data.other,
      });
    }
  }

  // New method to handle form submission
  onSubmit() {
    // Check if the form is valid
    if (this.form.valid) {
      // Replace 'Id' with the actual value or control from your form
      const formData: MedicalHistoryDto = {
        id: this.id,
        patientId: this.patientId!,
        martialStatus: this.form.controls['martialStatus'].value ?? false,
        pregnancy: this.form.controls['pregnancy'].value ?? false,
        bloodGroup: this.form.controls['bloodGroup'].value,
        previousSurgeries: this.form.controls['previousSurgeries'].value,
        medication: this.form.controls['medication'].value,
        smoker: this.form.controls['smoker'].value ?? false,
        diabetes: this.form.controls['diabetes'].value ?? false,
        highBloodPressure: this.form.controls['highBloodPressure'].value ?? false,
        lowBloodPressure: this.form.controls['lowBloodPressure'].value ?? false,
        asthma: this.form.controls['asthma'].value ?? false,
        hepatitis: this.form.controls['hepatitis'].value,
        heartDisease: this.form.controls['heartDisease'].value ?? false,
        anxityOrPanicDisorder: this.form.controls['anxityOrPanicDisorder'].value ?? false,
        depression: this.form.controls['depression'].value ?? false,
        allergies: this.form.controls['allergies'].value ?? false,
        other: this.form.controls['other'].value,
      };

      // Update the medical history with user-entered data
      this.medicalHistoryService.updateMedicalHistory(formData).subscribe({
        next: (response) => {
          console.log('Medical history updated successfully:', response);
          this.showSuccess(); 

        },
        error: (error) => {
          console.error('Error updating medical history:', error);
        },
      });
    } else {
      console.error('Form is not valid. Please check your inputs.');
    }
    
  }
  private showSuccess() {
      this.toast.success({ detail: "SUCCESS", summary: 'Patient medical history updated', duration: 9000 });
  }
  
}
