import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/Database';
import { AngularFireAuth } from 'angularfire2/Auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class GifService {
    private SEARCH_API_URI = 'https://api.tenor.co/v1/search?key=LIVDSRZULELA&locale=en_US&safesearch=strict&tag=';
    private GIF_API_URI = 'https://api.tenor.co/v1/gifs?key=LIVDSRZULELA&ids=';
    private dbItems: FirebaseListObservable<any>;
    private mySharedGifs: FirebaseListObservable<any>;
    public sharedGifs: Observable<any>;

    constructor(private http: Http, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
        this.dbItems = db.list('/gifs', {
            query: {
                limitToLast: 10
            }
        });

        afAuth.authState.subscribe(auth => {
            if (auth) {
                this.mySharedGifs = db.list('/users/' + auth.uid + '/gifs', {
                    query: {}
                });
            } else {
                this.mySharedGifs = null;
            }
        });

        const dbObservable = this.dbItems
            .map(data => {
                data.reverse();
                let giflist = '';
                data.map((el, index) => {
                    giflist += el.gif;
                    if (index !== data.length - 1) {
                        giflist += ',';
                    }
                });
                return giflist;
            });

        this.sharedGifs = dbObservable.mergeMap(x => {
            return this.http.get(this.GIF_API_URI + x)
                .map(d => this.processReturn(d));
            });

    }

    search(term: string): Observable<any> {
        return this.http
                    .get(this.SEARCH_API_URI + term)
                    .map(this.processReturn);
    }

    share(gif: string) {
        console.log('sharing ' + gif);
        this.dbItems.push({'gif': gif});
        const item = {};
        item[gif] = true;
        this.mySharedGifs.push(item);
    }

    private processReturn(res: Response) {
        const data = res.json();
        if (data.results) {
            data.results = data.results.map((e) => {
                if (e.media.length >= 0) {
                    const item = {
                        id: e.id,
                        title: e.title,
                        tinyurl: e.media[0].tinygif.url,
                        url: e.media[0].gif.url
                    };
                    return item;
                }
            });
            return data.results;
        } else {
            return [];
        }
    }
}
