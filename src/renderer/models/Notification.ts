type Notification = {
  _id: string;
  date_creation: Date;
  element: string;
  item: any;
  text: string;
  type: 'danger' | 'info' | 'success' | 'warning';
  viewed: boolean;
};

export default Notification;
