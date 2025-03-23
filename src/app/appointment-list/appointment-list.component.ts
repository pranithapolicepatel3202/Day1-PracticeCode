import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = "";
  newAppointmentDate: string = "";    // Use string for date input field
  appointment: Appointment[] = [];

  // ✅ Lifecycle hook to load data from localStorage when the app starts
  ngOnInit(): void {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      this.appointment = JSON.parse(savedAppointments);
    }
  }

  // ✅ Add new appointment
  addAppointment(): void {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: new Date(this.newAppointmentDate)  // Convert string to Date
      };

      // Push new appointment
      this.appointment.push(newAppointment);

      // Save to localStorage
      this.saveToLocalStorage();

      // Clear the input fields
      this.newAppointmentTitle = "";
      this.newAppointmentDate = "";
    }
  }

  // ✅ Delete appointment by id
  deleteAppointment(id: number): void {
    this.appointment = this.appointment.filter(appt => appt.id !== id);

    // Save updated list to localStorage
    this.saveToLocalStorage();
  }

  // ✅ Save the appointments list to localStorage
  saveToLocalStorage(): void {
    localStorage.setItem('appointments', JSON.stringify(this.appointment));
  }
}
