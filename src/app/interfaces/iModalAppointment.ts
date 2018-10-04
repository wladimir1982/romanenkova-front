export interface IModalAppointment {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  message: string;
  checkbox: string;
  submit: string;
  explanation: string;
  tooltips: {[key: string]: string};
  selectClear: string;
}
