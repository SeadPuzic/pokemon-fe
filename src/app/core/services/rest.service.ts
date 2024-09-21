import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListDTO } from '../models/list-dto';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Order {
  page: number,
  itemsPerPage: number,
}
export interface HttpRequestOptions {
  params?: HttpParams;
  headers?: HttpHeaders;
  responseType?: any;
}

export interface Sort {
  property?: string;
  order?: 'asc' | 'desc';
}

export interface ListOptions {
  page?: number;
  size?: number;
  expand?: number;
  sort?: Sort[];
}

export abstract class RestService {

  protected context!: string;
  protected abstract basePath: string;
  protected apiPath = 'api';
  protected version = 'v1';
  baseUrl = '';

  protected http = {
    get: <T>(path?: string, options?: HttpRequestOptions): Observable<T> =>
      this.httpClient.get<T>(this.generateUrl(path), options),

    list: <T>(path?: string, listOptions?: ListOptions, httpOptions: HttpRequestOptions = {}): Observable<ListDTO<T>> => {
      const options: HttpRequestOptions = {
        headers: httpOptions.headers,
        params: httpOptions.params || new HttpParams()
      };

      if (listOptions) {
        if (listOptions.page) {
          options.params = options!.params!.set('page', listOptions.page.toString(10));
        }

        if (listOptions.size) {
          options.params = options!.params!.set('size', listOptions.size.toString(10));
        }

        if (listOptions.expand) {
          options.params = options!.params!.set('expand', listOptions.expand.toString(10));
        }

        if (listOptions.sort) {
          listOptions.sort.forEach(sort => {
            if (!sort.property) { return; }

            let value = sort.property;

            if (sort.order) { value += ',' + sort.order; }

            options.params = options!.params!.append('sort', value);
          });
        }
      }

      return this.httpClient.get<ListDTO<T>>(this.generateUrl(path), options)
        .pipe(
          tap((list: any) => {
            list.content = list.content.filter((x: any) => !x['isDeleted']);
          })
        );
    },

    post: <T>(body: any | null, path?: string, options?: HttpRequestOptions): Observable<T> =>
      this.httpClient.post<T>(this.generateUrl(path), body, options),

    postWithEvents: <T>(body: any | null, path?: string, options?: HttpRequestOptions): Observable<HttpEvent<T>> => {
      const request = new HttpRequest<T>('POST', this.generateUrl(path), body, { ...options, reportProgress: true });

      return this.httpClient.request(request);
    },

    put: <T>(body: any | null, path?: string, options?: HttpRequestOptions): Observable<T> =>
      this.httpClient.put<T>(this.generateUrl(path), body, options),

    delete: <T>(path?: string, options?: HttpRequestOptions): Observable<T> =>
      this.httpClient.delete<T>(this.generateUrl(path), options),

    head: <T>(path?: string, options?: HttpRequestOptions): Observable<T> =>
      this.httpClient.head<T>(this.generateUrl(path), options)
  };

  protected constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  protected generateUrl(path?: string): string {

    const base = this.baseUrl;

    const parts = [this.context, this.apiPath, this.version, this.basePath, path]
      .filter(p => !!p)
      .join('/');

    return base + '/' + parts;
  }
}
