import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private url = 'http://localhost:3000'; // members endpoint

  constructor(private http: HttpClient)  {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  // getMembers(): Observable<any> {
  //   const url = `${this.url}/members/members`;
  //   return this.http.get(url);
  // }

  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: { user: any; room: string; message: string; phone: string; }): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

}
