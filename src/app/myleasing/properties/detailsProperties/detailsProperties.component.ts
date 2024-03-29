import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';
import { PropertyResponse } from '../../../models/propertyResponse';
import { OwnerResponse } from '../../../models/ownerResponse';
import { UserResponse } from 'src/app/models/userResponse';
import { PropertyTypeResponse } from '../../../models/propertyTypeResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-property',
  templateUrl: './detailsProperties.component.html',
  styles: [
  ]
})
export class DetailsPropertyComponent implements OnInit {

  //property = <PropertyResponse>{};
  //property = {} as PropertyResponse;

  formImage: FormGroup;

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
  };
  
  owner: OwnerResponse = {
    id: 0,
    user: this.user,
    properties: [],
    contracts: []
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

  showProperties: boolean;
  showPropertyDetails: boolean;
  showSeachPropertyDetails: boolean;
  myPropertyDetails: boolean;
  addImageShow: boolean = true;
  deleteImageShow: boolean = true;
  deleteContractShow: boolean = true;
  id: string = "";
  propertyId: string = "";
  myPropertyId: string = "";
  searchPropetyId: string = "";
  contractId: number;
  imageId: number;
  currentPage: number;
  currentPageImage: number;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) { 
      this.formImage = this.fb.group({
        image  : ['', [ Validators.required] ],
        file  : [''],
        imageSource: ['', [ Validators.required] ],
      });
      this.currentPage = 1;
      this.currentPageImage = 1;
      this.contractId = 0;
      this.imageId = 0;
      this.showProperties = false;
      this.showPropertyDetails = false;
      this.showSeachPropertyDetails = false;
      this.myPropertyDetails = false;
      this._activated.params.subscribe( params => {
        this.id = params['id'] != null ? params['id'] : "";
        this.propertyId = params['propertyId'] != null ? params['propertyId'] : "";
        this.myPropertyId = params['myPropertyId'] != null ? params['myPropertyId'] : "";
        this.searchPropetyId = params['searchPropetyId'] != null ? params['searchPropetyId'] : "";
      });
      if (localStorage.getItem('token') != null) {
        if (this._myleasing.validateToken()) {
          this.logOut();
        } else {
          this.showProperties = true;
          this._myleasing.setLoading(true);
          if (this.id != "") {
            this.getPropertyDetails(this.id);
          }

          if (this.propertyId != "") {
            this.showPropertyDetails = true;
            this.getOwnwerPropertyDetails();
          }

          if (this.myPropertyId != "") {
            this.myPropertyDetails = true;
            this.getOwnwerPropertyDetails();
          }

          if (this.searchPropetyId != "") {
            this.showSeachPropertyDetails = true;
            this.getPropertyDetails(this.searchPropetyId);
          }
        }
      } else {
        this._myleasing.setLoading(true);
        this.getProperty();
      }
  }

  ngOnInit(): void {
  }

  get imageInvalid() {
    return this.formImage.get('image')?.invalid && this.formImage.get('image')?.touched;
  }

  gotoProperty() {
    this._router.navigateByUrl('properties');
  }

  gotoSeachProperty() {
    this._router.navigateByUrl('seachProperties');
  }

  gotoMyProperty() {
    this._router.navigateByUrl('myProperties');
  }

  gotoOwnerDetails() {
    this._router.navigate([ 'owners/detailsOwner', this.property.owner.id ]);
  }

  gotoCreateContract()  {
    this._router.navigate([ 'owners/createContract', this.property.id ]);
  }

  gotoEditContract(id: number) {
    this._router.navigate([ 'owners/editContract', id ]);
  }

  gotoDetailsContract(id: number) {
    this._router.navigate([ 'owners/detailsContract', id ]);
  }
  
  getProperty() {
    this._apiService.getLogin(`Properties/GetPropertyWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
        this._myleasing.setLoading(false);
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

  getPropertyDetails(id : string) {
    this._apiService.getQuery(`Properties/DetailsPropertyWeb/${id}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
        this._myleasing.setLoading(false);
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

  getOwnwerPropertyDetails() {
    let propertyId = this.myPropertyDetails == false ? this.propertyId : this.myPropertyId;
    this._apiService.getQuery(`Owners/DetailsPropertyWeb/${propertyId}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
        this._myleasing.setLoading(false);
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

  showContract(id: number) {
    this.contractId = id;
    this.deleteContractShow = false;
  }

  closeContract() {
    this.deleteContractShow = true;
  }

  showDeleteImage(id: number) {
    this.imageId = id;
    this.deleteImageShow = false;
  }

  closeDeleteImage() {
    this.deleteImageShow = true;
  }

  showAddImage() {
    this.addImageShow = false;
  }

  closeAddImage() {
    this.formImage.reset({
      image: '',
      file: '',
      imageSource: ''
    });
    this.addImageShow = true;
  }

  deleteContract() {
    this.closeContract();
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Owners/DeleteContracWeb/${this.contractId}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2000,
          text: res.message
        }
        )
        this.getOwnwerPropertyDetails();
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

  deleteImage() {
    this.closeDeleteImage();
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Owners/DeleteImageWeb/${this.imageId}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2000,
          text: res.message
        }
        )
        this.getOwnwerPropertyDetails();
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

  onFileChange(event: any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formImage.patchValue({
        image: file ? file.name : '',
        imageSource: file
      });
    }
  }

  addImage() {
    if ( this.formImage.invalid ) {
      
      return Object.values( this.formImage.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    const formData = new FormData();
    formData.append('ImageFile', this.formImage.value.imageSource);
    formData.append('PropertyId', this.myPropertyDetails == false ? this.propertyId : this.myPropertyId);

    this.closeAddImage();
    this._myleasing.setLoading(true);

    this._apiService.postQuery('Owners/AddImageWeb', formData).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2000,
          text: res.message
        }
        )
        this.getOwnwerPropertyDetails();
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
