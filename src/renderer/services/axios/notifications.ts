import api from './axios';

export interface INotifications {
  editNotification: (
    notificationID: string,
    params: { viewed: boolean }
  ) => Promise<any>;
  getNotifications: (params?: {
    limit?: number;
    viewed?: boolean;
  }) => Promise<any>;
  getTotalUnread: () => Promise<any>;
}

const services: INotifications = {
  editNotification(notificationID, params) {
    return api.put(`notifications/${notificationID}`, params);
  },
  getNotifications(params) {
    return api.get('notifications', { params });
  },
  getTotalUnread() {
    return api.get('notifications/total_unread');
  },
};

export default services;
