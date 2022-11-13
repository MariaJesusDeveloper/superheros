import { TestBed } from '@angular/core/testing';

import { SuperHerosService } from './super-heroes.service';
import { SUPERHEROS } from '../mocks/mock-super-heros';
import { HttpClientModule } from '@angular/common/http';


describe('SuperHerosService', () => {
  let service: SuperHerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperHerosService],
      imports: [
        HttpClientModule
      ]
    })
    service = TestBed.inject(SuperHerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllSuperHeros should return array from SUPERHEROS',
    (done: DoneFn) => {
      service.getAllSuperHeros().subscribe(value => {
        expect(value).toBe(SUPERHEROS);
        done();
      });
    }
  );

  it('#getSuperHeroById should return an superhero',
    (done: DoneFn) => {
      let getSuperHero = { id: 2, name: "Capitán América" };
      service.getSuperHeroById(2).subscribe(value => {
        expect(value).toEqual(getSuperHero);
        done();
      });
    }
  );

  it('#getSuperHeroByName should return an superhero',
    (done: DoneFn) => {
      let getSuperHero = { id: 5, name: "Hulk" };
      service.getSuperHeroByName("Hulk").subscribe(value => {
        expect(value).toEqual(getSuperHero);
        done();
      });
    }
  );

  it('#getAllSuperHerosByName should return array from SUPERHEROS',
    (done: DoneFn) => {
      let mocksManSuperHeros = [
        { "id": 1, "name": "Spider-Man" },
        { "id": 6, "name": "Iron Man" },
        { "id": 12, "name": "Súperman" },
        { "id": 13, "name": "Manolito el fuerte" }
      ];
      service.getAllSuperHerosIncludeName('man').subscribe(value => {
        expect(value).toEqual(mocksManSuperHeros);
        done();
      });
    }
  );

  it('#createNewSuperHero should return number with the length of SUPERHEROS',
    (done: DoneFn) => {
      let newSuperHero = 'New Superhero';
      service.createNewSuperHero('New Superhero').subscribe(value => {
        expect(value).toBe(SUPERHEROS.length);
        done();
      });
    }
  );

  it('#updateSuperHero should return superhero name',
    (done: DoneFn) => {
      let editSuperHero = 'Edit Superhero';
      service.updateSuperHero(13, editSuperHero).subscribe(value => {
        expect(value).toEqual(editSuperHero);
        done();
      });
    }
  );

  it('#deleteSuperHero should return superhero deleted',
    (done: DoneFn) => {
      service.deleteSuperHero(11).subscribe(value => {
        let deleteSuperHero = [{ "id": 11, "name": "Bruja Escarlata" }];
        expect(value).toEqual(deleteSuperHero);
        done();
      });
    }
  );

});
