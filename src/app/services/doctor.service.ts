import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterDoctorDto } from '../Types/RegisterDoctorDto';
import { Observable } from 'rxjs';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { GetDoctorByIDDto } from '../Types/GetDoctorrByIDDto';
import { UpdateDoctorStatusDto } from '../Types/UpdateDoctorDto';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private client : HttpClient) { }

  public registerDoctor(register : RegisterDoctorDto) : Observable<object>{
    return this.client.post(`https://localhost:7267/api/Doctor/Doctor/register`,register);
  }
  public GetAllSpecializations(): Observable<GetAllSpecializationsDto[]>{
    return this.client.get<GetAllSpecializationsDto[]>('https://localhost:7267/api/Doctor/GetAllSpecialization');}

    public UploadPhoto(drId : string, photo:string):Observable<object>{
      return this.client.post(`https://localhost:7267/api/Doctor/doctors/uploadimage/${drId}`,photo);
    }
    public GetDoctorByPhone(phone : string ): Observable<GetDoctorByPhoneDto>{
      return this.client.get<GetDoctorByPhoneDto>(`https://localhost:7267/api/Doctor/doctor/${phone}`);
    }
    public getDoctorById(id: string): Observable<GetDoctorByIDDto>{
      return this.client.get<GetDoctorByIDDto>(`https://localhost:7267/api/Doctor/doctors/${id}`);
    }

    
   public UpdateDoctor(drId:string, doctor : UpdateDoctorStatusDto):Observable<object>{
    return this.client.post(`https://localhost:7267/api/Admins/admins/updatedoctor/${drId}`,doctor);

   }
  }