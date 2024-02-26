import {makeAutoObservable} from 'mobx';

class EventStore {
  events = [];

  constructor() {
    makeAutoObservable(this);

    this.loadEventsFromLocalStorage();
  }

  addEvent(title, startTime, endTime, reminder) {
    const id = Date.now().toString();

    const event = {
      id,
      title,
      startTime,
      endTime,
      reminder
    };

    this.events.push(event);
    this.saveEventsToLocalStorage();
  }

  editEvent(id, title, startTime, endTime, reminder) {
    const event = this.events.find(event => event.id === id);

    if (event) {
      event.title = title;
      event.startTime = startTime;
      event.endTime = endTime;
      event.reminder = reminder;

      this.saveEventsToLocalStorage();
    }
  }

  deleteEvent(id) {
    this.events = this.events.filter(event => event.id !== id);
    this.saveEventsToLocalStorage();
  }

  loadEventsFromLocalStorage() {
    const eventsFromLocalStorage = JSON.parse(localStorage.getItem('events'));
    if (eventsFromLocalStorage) {
      this.events = eventsFromLocalStorage;
    }
  }

  saveEventsToLocalStorage() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }
}

const eventStore = new EventStore();
export default eventStore;
