import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {
    constructor(private http: HttpClient) { }

    saveUser(user){
        return this.http.post('http://localhost:4200/api/SaveUser/', user);
    }

    GetUser(){
        return this.http.get('http://localhost:4200/api/getUser/');
    }

    deleteUser(id){
        return this.http.post('http://localhost:4200/api/deleteUser/', id);
    }

}
