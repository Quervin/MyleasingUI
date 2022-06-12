import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { AddContractRequest } from 'src/app/models/addContractRequest';
import { ContractResponse } from 'src/app/models/contractResponse';
import { LesseeResponse } from 'src/app/models/lesseeResponse';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { PropertyResponse } from 'src/app/models/propertyResponse';
import { PropertyTypeResponse } from 'src/app/models/propertyTypeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-contract',
  templateUrl: './createContract.component.html',
  styles: [
  ]
})
export class CreateContractComponent implements OnInit {

  formContract: FormGroup;

  user : UserResponse = {
    id: "",
    document: "",
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    fullNameWithDocument: "",
    phone: ""
  }

  lessee: LesseeResponse = {
    id: 0,
    user : this.user,
    contracts: []
  }

  owner: OwnerResponse = {
    id: 0,
    user : this.user,
    contracts: [],
    properties: []
  }

  propertyType: PropertyTypeResponse = {
    id: 0,
    name: "",
    properties: []
  }

  property: PropertyResponse = {
    id: 0,
    neighborhood: "",
    isAvailable: false,
    latitude: 0,
    longitude: 0,
    price: 0,
    address : "",
    firstImage: "",
    remarks: "",
    stratum: 0,
    rooms: 0,
    hasParkingLot: false,
    squareMeters: 0,
    owner: this.owner,
    propertyType: this.propertyType,
    contracts: [],
    propertyImages: [],
  };

  contractResponse: ContractResponse = {
    id: 0,
    endDate: "",
    startDate: "",
    isActive: false,
    price: 0,
    remarks: "",
    lessee : this.lessee,
    owner: this.owner,
    property: this.property
  }
  
  addContractRequest: AddContractRequest = {
    Id: 0,
    Price: 0,
    Remarks: "",
    StartDate: "",
    EndDate: "",
    IsActive: false,
    LesseeId: 0,
    OwnerId: 0,
    PropertyTypeId: 0
  }

  lessees: SelectItem[];

  lesseeResponse : LesseeResponse[];

  editMode: boolean;
  id: string;
  button: string;
  titulo: string;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) { 
      this.editMode = false;
      this.id = "";
      this.button = "Crear";
      this.titulo = "Crear Contract";
      this.lessees = [];
      this.lesseeResponse = [];
      this.formContract = this.fb.group({
        lesseeId: ['', [Validators.required] ],
        remarks: ['', [Validators.required] ],
        price: ['', [Validators.required] ],
        starDate: ['', [Validators.required] ],
        endDate: ['', [Validators.required] ],
        isActive: [false, [Validators.required] ],
      });
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this.getLessees();
        this._activated.params.subscribe( params => {
          this.id = params['id'] != null ? params['id'] : "";
          if (this.id != "") {
            this.editMode = true;
            this.button = "Editar";
            this.titulo = "Editar Contract";
            this.getContract();
          }
        });
      }
    }

  ngOnInit(): void {
  }

  gotoDetailsLessee() {
    this._router.navigate([ 'lessees/detailsLessee', this.contractResponse.lessee.id ]);
  }
  
  get lesseeInvalid() {
    return this.formContract.get('lesseeId')?.invalid && this.formContract.get('lesseeId')?.touched;
  }

  get remarksInvalid() {
    return this.formContract.get('remarks')?.invalid && this.formContract.get('remarks')?.touched;
  }

  get priceInvalid() {
    return this.formContract.get('price')?.invalid && this.formContract.get('price')?.touched;
  }

  get starDateInvalid() {
    return this.formContract.get('starDate')?.invalid && this.formContract.get('starDate')?.touched;
  }

  get endDateInvalid() {
    return this.formContract.get('endDate')?.invalid && this.formContract.get('endDate')?.touched;
  }

  get isActiveInvalid() {
    return this.formContract.get('isActive')?.invalid && this.formContract.get('isActive')?.touched;
  }

  getContract() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/GetContractWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.contractResponse = res.result;
        this.setDataFormContract();
      } else {
        this._myleasing.setLoading(false);
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      this._myleasing.setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
  }

  getLessees() {
    this._apiService.getQuery('Lessees/GetLesseesWeb').
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.lesseeResponse = res.result;
        this.lesseeResponse.forEach(value => {
          this.lessees.push({label: value.user.fullNameWithDocument , value: value.id});
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
  }

  setDataFormContract() {
    this.formContract.reset({
      lesseeId: this.contractResponse.lessee.id,
      remarks: this.contractResponse.remarks,
      price: this.contractResponse.price,
      starDate: formatDate(this.contractResponse.startDate, 'yyyy-MM-dd', 'en'),
      endDate: formatDate(this.contractResponse.endDate, 'yyyy-MM-dd', 'en'),
      isActive: this.contractResponse.isActive
    });
    this._myleasing.setLoading(false);
  }

  onCheckboxChange(event: any) {

  }

  create() {
    if ( this.formContract.invalid ) {
      
      return Object.values( this.formContract.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addContractRequest.OwnerId = this.contractResponse.owner.id;
    this.addContractRequest.PropertyTypeId = this.contractResponse.property.propertyType.id;
    this.addContractRequest.LesseeId = this.formContract.value.lesseeId;
    this.addContractRequest.Price = this.formContract.value.price;
    this.addContractRequest.Remarks = this.formContract.value.remarks;
    this.addContractRequest.StartDate = this.formContract.value.starDate;
    this.addContractRequest.EndDate = this.formContract.value.endDate;
    this.addContractRequest.IsActive = this.formContract.value.isActive;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Owners/AddContractWeb', this.addContractRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.formContract.reset({
          lesseeId: '',
          remarks: '',
          price: '',
          starDate: '',
          endDate: '',
          isActive: ''
        });
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2000,
          text: res.message
        }
        )
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      this._myleasing.setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
  }

  edit() {
    if ( this.formContract.invalid ) {
      
      return Object.values( this.formContract.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addContractRequest.Id = this.contractResponse.id;
    this.addContractRequest.OwnerId = this.contractResponse.owner.id;
    this.addContractRequest.PropertyTypeId = this.contractResponse.property.propertyType.id;
    this.addContractRequest.LesseeId = this.formContract.value.lesseeId;
    this.addContractRequest.Price = this.formContract.value.price;
    this.addContractRequest.Remarks = this.formContract.value.remarks;
    this.addContractRequest.StartDate = this.formContract.value.starDate;
    this.addContractRequest.EndDate = this.formContract.value.endDate;
    this.addContractRequest.IsActive = this.formContract.value.isActive;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Lessees/UpdateContractWeb' , this.addContractRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this._router.navigate([ 'lessees/detailsLessee', this.contractResponse.lessee.id ]);
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2000,
          text: res.message
        }
        )
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      this._myleasing.setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
    
  }

  logOut() {
    localStorage.clear();
    this._myleasing.showComponets(true);
    this._router.navigateByUrl('/index');
  }

}
