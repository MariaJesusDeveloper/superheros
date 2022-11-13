import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { SuperHero } from '../models/super-hero.model';
import { SUPERHEROS } from '../mocks/mock-super-heros';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SuperHerosService {
  apiUrl: string = 'http://localhost:3000/api/superheros';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all superheros
   * @returns An Observable of type array of SuperHero
  */
  getAllSuperHeros(): Observable<SuperHero[]> {
    // return this.http.get<SuperHero[]>(`${this.apiUrl}`);
    return of(SUPERHEROS);
  }

  /**
   * Get superhero by id
   * @param id superhero id
   * @returns An Observable of type SuperHero
   */
  getSuperHeroById(id: number): Observable<SuperHero> {
    return of(SUPERHEROS.filter(superHero => superHero.id === id)[0]);
  }

  /**
   * Get superhero by name
   * @param id superhero name
   * @returns An Observable of type SuperHero
   */
  getSuperHeroByName(name: string): Observable<SuperHero> {
    return of(SUPERHEROS.filter(superHero => superHero.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase() === name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())[0]);
  }

  /**
   * Get all superheroes that contain a parameter in their name
   * @param name Name that should contain the superhero
   * @returns An Observable of type array of SuperHero
  */
  getAllSuperHerosIncludeName(name: string): Observable<SuperHero[]> {
    return of(SUPERHEROS.filter(superHero =>
      superHero.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().indexOf(
        name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
      ) >= 0)
    );
  }

  /**
   * Create new superhero
   * @param name Name of superhero
   * @returns An Observable of type number with the position of the new superhero
  */
  createNewSuperHero(name: string): Observable<any> {
    return of(SUPERHEROS.push(new SuperHero(SUPERHEROS.length + 1, name))).pipe();
  }

  /**
   * Update superhero
   * @param id superhero id to modify
   * @param name new name of superhero
   * @returns An Observable of type array of SuperHero with the superhero deleted
  */
  updateSuperHero(id: number, name: string): Observable<String> {
    return of(SUPERHEROS.filter(superHero => superHero.id === id)[0].name = name);
  }

  /**
   * Delete superhero
   * @param id superhero id to delete
   * @returns An Observable of type string with the name of the new superhero
  */
  deleteSuperHero(id: number): Observable<SuperHero[]> {
    return of(SUPERHEROS.splice(SUPERHEROS.indexOf(SUPERHEROS.filter(superHero => superHero.id === id)[0]), 1));
  }

  // // Handle API errors
  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}
