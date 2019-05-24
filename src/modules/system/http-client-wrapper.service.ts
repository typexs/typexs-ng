import {Injectable} from '@angular/core';
import {MessageService} from './messages/message.service';
import {MessageChannel} from './messages/MessageChannel';
import {LogMessage} from './messages/types/LogMessage';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class HttpClientWrapper {


  logChannel: MessageChannel<LogMessage>;


  constructor(private http: HttpClient, private messageService: MessageService) {
    this.logChannel = messageService.getLogService();
  }


  get<T>(url: string, response?: (err: Error, data: T) => void): void | Promise<T> {
    if (response) {
      this.http.get<T>(url).subscribe(res => {
          response(null, res);
        },
        (err: HttpErrorResponse) => {
          response(err, null);
          this.logChannel.publish(LogMessage.error(err));
        });

    } else {
      return <Promise<T>>this.http.get(url).toPromise().catch(err => {
        this.logChannel.publish(LogMessage.error(err));
        throw err;
      });

    }
  }

  post<T>(url: string, body: any, response?: (err: Error, data: T) => void): void | Promise<T> {
    if (response) {
      this.http.post<T>(url, body).subscribe(res => {
          response(null, res);
        },
        (err: HttpErrorResponse) => {
          response(err, null);
          this.logChannel.publish(LogMessage.error(err));
        });

    } else {
      return <Promise<T>>this.http.post(url, body).toPromise().catch(err => {
        this.logChannel.publish(LogMessage.error(err));
        throw err;
      });
    }
  }

  delete<T>(url: string, response?: (err: Error, data: T) => void): void | Promise<T> {
    if (response) {
      this.http.delete<T>(url).subscribe(res => {
          response(null, res);
        },
        (err: HttpErrorResponse) => {
          response(err, null);
          this.logChannel.publish(LogMessage.error(err));
        });

    } else {
      return <Promise<T>>this.http.delete(url).toPromise().catch(err => {
        this.logChannel.publish(LogMessage.error(err));
        throw err;
      });

    }
  }

}
