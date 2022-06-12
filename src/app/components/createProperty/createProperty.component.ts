import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { AddPropertyRequest } from 'src/app/models/addPropertyRequest';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { PropertyResponse } from 'src/app/models/propertyResponse';
import { PropertyTypeResponse } from 'src/app/models/propertyTypeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-property',
  templateUrl: './createProperty.component.html',
  styles: [
  ]
})
export class CreatePropertyComponent implements OnInit {

  formProperty: FormGroup;

  addPropertyRequest: AddPropertyRequest = {
    Id: 0,
    OwnerId: 0,
    PropertyTypeId: 0,
    Neighborhood: "",
    Address: "",
    Price: 0,
    SquareMeters: 0,
    Stratum: 0,
    HasParkingLot: false,
    IsAvailable: false,
    Remarks: "",
    Rooms: 0,
    Latitude: 0,
    Longitude: 0
  }

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

  propertyResponse: PropertyResponse = {
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

  propertyTypes: SelectItem[];

  propertyTypeResponse : PropertyTypeResponse[];

  editMode: boolean;
  id: string;
  ownerId: string;
  button: string;
  titulo: string;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) {
      this.editMode = false;
      this.id = "";
      this.ownerId = "";
      this.button = "Crear";
      this.titulo = "Crear Propiedad";
      this.propertyTypeResponse = [];
      this.propertyTypes = [];
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this.getPropertyTypes();
        this._activated.params.subscribe( params => {
          this.id = params['id'] != null ? params['id'] : "";
          this.ownerId = params['ownerId'] != null ? params['ownerId'] : "";
          if (this.id != "") {
            this.editMode = true;
            this.button = "Editar";
            this.titulo = "Editar Property";
            this.getProperty();
          }
        });
      }
      this.formProperty = this.fb.group({
        propertyTypeId: ['', [ Validators.required] ],
        neighborhood: ['', [Validators.required] ],
        address: ['', [Validators.required] ],
        price: ['', [Validators.required] ],
        squareMeters: ['', [Validators.required] ],
        rooms: ['', [Validators.required] ],
        stratum: ['', [Validators.required] ],
        latitude: ['', [Validators.required] ],
        longitude: ['', [Validators.required] ],
        hasParkingLot: [false, [Validators.required] ],
        isAvailable: [false, [Validators.required] ],
        remarks: ['', [Validators.required] ],
      });
     }

  ngOnInit(): void {
  }

  gotoDetailsOwner() {
    this._router.navigate([ 'owners/detailsOwner', this.editMode == true ? this.propertyResponse.owner.id : this.ownerId ]);
  }

  get propertyTypeInvalid() {
    return this.formProperty.get('propertyTypeId')?.invalid && this.formProperty.get('propertyTypeId')?.touched;
  }

  get neighborhoodInvalid() {
    return this.formProperty.get('neighborhood')?.invalid && this.formProperty.get('neighborhood')?.touched;
  }

  get addressInvalid() {
    return this.formProperty.get('address')?.invalid && this.formProperty.get('address')?.touched;
  }

  get priceInvalid() {
    return this.formProperty.get('price')?.invalid && this.formProperty.get('price')?.touched;
  }

  get squareMetersInvalid() {
    return this.formProperty.get('squareMeters')?.invalid && this.formProperty.get('squareMeters')?.touched;
  }

  get roomsInvalid() {
    return this.formProperty.get('rooms')?.invalid && this.formProperty.get('rooms')?.touched;
  }

  get stratumInvalid() {
    return this.formProperty.get('stratum')?.invalid && this.formProperty.get('stratum')?.touched;
  }

  get latitudeInvalid() {
    return this.formProperty.get('latitude')?.invalid && this.formProperty.get('latitude')?.touched;
  }

  get longitudeInvalid() {
    return this.formProperty.get('longitude')?.invalid && this.formProperty.get('longitude')?.touched;
  }

  get hasParkingLotInvalid() {
    return this.formProperty.get('hasParkingLot')?.invalid && this.formProperty.get('hasParkingLot')?.touched;
  }

  get isAvailableInvalid() {
    return this.formProperty.get('isAvailable')?.invalid && this.formProperty.get('isAvailable')?.touched;
  }

  get remarksInvalid() {
    return this.formProperty.get('remarks')?.invalid && this.formProperty.get('remarks')?.touched;
  }

  getProperty() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Owners/GetPropertyWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.propertyResponse = res.result;
        this.setDataFormProperty();
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

  getPropertyTypes() {
    this._apiService.getQuery('PropertyTypes/GetPropertiesTypeWeb').
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.propertyTypeResponse = res.result;
        this.propertyTypeResponse.forEach(value => {
          this.propertyTypes.push({label: value.name , value: value.id});
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

  setDataFormProperty() {
    this.formProperty.reset({
      propertyTypeId: this.propertyResponse.propertyType.id,
      neighborhood: this.propertyResponse.neighborhood,
      address: this.propertyResponse.address,
      price: this.propertyResponse.price,
      squareMeters: this.propertyResponse.squareMeters,
      rooms: this.propertyResponse.rooms,
      stratum: this.propertyResponse.stratum,
      latitude: this.propertyResponse.latitude,
      longitude: this.propertyResponse.longitude,
      hasParkingLot: this.propertyResponse.hasParkingLot,
      isAvailable: this.propertyResponse.isAvailable,
      remarks: this.propertyResponse.remarks
    });
    this._myleasing.setLoading(false);
  }

  create() {
    if ( this.formProperty.invalid ) {
      
      return Object.values( this.formProperty.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addPropertyRequest.OwnerId = Number.parseFloat(this.ownerId);
    this.addPropertyRequest.PropertyTypeId = this.formProperty.value.propertyTypeId;
    this.addPropertyRequest.Neighborhood = this.formProperty.value.neighborhood;
    this.addPropertyRequest.Address = this.formProperty.value.address;
    this.addPropertyRequest.Price = this.formProperty.value.price;
    this.addPropertyRequest.SquareMeters = this.formProperty.value.squareMeters;
    this.addPropertyRequest.Rooms = this.formProperty.value.rooms;
    this.addPropertyRequest.Stratum = this.formProperty.value.stratum;
    this.addPropertyRequest.Latitude = this.formProperty.value.latitude;
    this.addPropertyRequest.Longitude = this.formProperty.value.longitude;
    this.addPropertyRequest.HasParkingLot = this.formProperty.value.hasParkingLot;
    this.addPropertyRequest.IsAvailable = this.formProperty.value.isAvailable;
    this.addPropertyRequest.Remarks = this.formProperty.value.remarks;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Owners/AddPropertyWeb', this.addPropertyRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.formProperty.reset({
          propertyTypeId: '',
          neighborhood: '',
          address: '',
          price: '',
          squareMeters: '',
          rooms: '',
          stratum: '',
          latitude: '',
          longitude: '',
          hasParkingLot: false,
          isAvailable: false,
          remarks: '',
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
    if ( this.formProperty.invalid ) {
      
      return Object.values( this.formProperty.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addPropertyRequest.Id = this.propertyResponse.id;
    this.addPropertyRequest.OwnerId = this.propertyResponse.owner.id;
    this.addPropertyRequest.PropertyTypeId = this.formProperty.value.propertyTypeId;
    this.addPropertyRequest.Neighborhood = this.formProperty.value.neighborhood;
    this.addPropertyRequest.Address = this.formProperty.value.address;
    this.addPropertyRequest.Price = this.formProperty.value.price;
    this.addPropertyRequest.SquareMeters = this.formProperty.value.squareMeters;
    this.addPropertyRequest.Rooms = this.formProperty.value.rooms;
    this.addPropertyRequest.Stratum = this.formProperty.value.stratum;
    this.addPropertyRequest.Latitude = this.formProperty.value.latitude;
    this.addPropertyRequest.Longitude = this.formProperty.value.longitude;
    this.addPropertyRequest.HasParkingLot = this.formProperty.value.hasParkingLot;
    this.addPropertyRequest.IsAvailable = this.formProperty.value.isAvailable;
    this.addPropertyRequest.Remarks = this.formProperty.value.remarks;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Owners/UpdatePropertyWeb' , this.addPropertyRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this._router.navigate([ 'owners/detailsOwner', this.propertyResponse.owner.id ]);
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
