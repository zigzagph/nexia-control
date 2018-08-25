import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private url = 'http://' + location.hostname + ':3000';

    constructor(private http: HttpClient) {}

     public getServers(): Observable<any> {
        return this.http.get(this.url + '/servers').pipe(map( (res: Response) => res));
    }

    public sendCmd(ip: string, cmd: string): Observable<any> {
        // Initialize Params Object
        let Params = new HttpParams();

        // Begin assigning parameters
        Params = Params.append('ip', ip);
        Params = Params.append('cmd', cmd);

        return this.http.get(this.url + '/send/', { params: Params }).pipe(map((res: Response) => res));
    }
}
