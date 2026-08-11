import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  ClassScheduleItem,
  AttendanceSubject,
  AttendanceRecord,
  AttendanceSession,
  WalletTransaction,
  Event,
  CampusLocation,
  MarketplaceListing,
  Announcement,
  NotificationItem,
  SystemStats
} from '../types';

import {
  DEMO_USERS,
  INITIAL_TODAY_CLASSES,
  INITIAL_ATTENDANCE_SUBJECTS,
  INITIAL_ATTENDANCE_HISTORY,
  INITIAL_WALLET_TRANSACTIONS,
  INITIAL_EVENTS,
  INITIAL_LOCATIONS,
  INITIAL_MARKETPLACE_LISTINGS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SYSTEM_STATS
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  switchDemoUser: (role: UserRole) => void;
  logout: () => void;
  login: (email: string, role: UserRole) => boolean;

  // View state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileFrameMode: boolean;
  setMobileFrameMode: (enabled: boolean) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;

  // Classes & Attendance
  todayClasses: ClassScheduleItem[];
  attendanceSubjects: AttendanceSubject[];
  attendanceHistory: AttendanceRecord[];
  activeSession: AttendanceSession | null;
  startFacultySession: (subjectCode: string, room: string, durationMinutes: number) => AttendanceSession;
  endFacultySession: () => void;
  markStudentAttendanceQR: (sessionToken: string) => { success: boolean; message: string };

  // Wallet
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  topUpWallet: (amount: number, method: string) => void;
  makePayment: (amount: number, title: string, merchant: string, category: WalletTransaction['category']) => boolean;

  // Events
  events: Event[];
  registerForEvent: (eventId: string) => void;
  cancelEventRegistration: (eventId: string) => void;
  createEvent: (newEvent: Omit<Event, 'id' | 'registeredCount' | 'registeredUserIds'>) => void;

  // Campus Navigation
  locations: CampusLocation[];

  // Marketplace
  marketplaceListings: MarketplaceListing[];
  addMarketplaceListing: (newListing: Omit<MarketplaceListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerDept' | 'postedDate' | 'status'>) => void;
  toggleFavoriteListing: (id: string) => void;

  // Announcements & Notifications
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;

  // Admin / Stats
  systemStats: SystemStats;
  allUsers: User[];
  toggleUserStatus: (userId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.student);
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileFrameMode, setMobileFrameMode] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Core Data States
  const [todayClasses, setTodayClasses] = useState<ClassScheduleItem[]>(INITIAL_TODAY_CLASSES);
  const [attendanceSubjects, setAttendanceSubjects] = useState<AttendanceSubject[]>(INITIAL_ATTENDANCE_SUBJECTS);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_HISTORY);
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>({
    id: 'sess_live_101',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures & Algorithms',
    facultyId: 'usr_fac_001',
    facultyName: 'Dr. Sarah Jenkins',
    room: 'Lab 402 - Tech Block A',
    startTime: '09:00 AM',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    activeToken: 'SUPER_CAMPUS_CS301_TOKEN_9921',
    status: 'active',
    scannedStudentIds: []
  });

  const [walletBalance, setWalletBalance] = useState<number>(78.30);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_WALLET_TRANSACTIONS);

  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [locations] = useState<CampusLocation[]>(INITIAL_LOCATIONS);
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>(INITIAL_MARKETPLACE_LISTINGS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [systemStats, setSystemStats] = useState<SystemStats>(INITIAL_SYSTEM_STATS);
  const [allUsers, setAllUsers] = useState<User[]>([
    DEMO_USERS.student,
    DEMO_USERS.faculty,
    DEMO_USERS.admin,
    {
      id: 'usr_std_002',
      name: 'Marcus Vance Jr.',
      email: 'marcus@example.com',
      role: 'student',
      studentId: 'CS2026-0410',
      department: 'Electrical Engineering',
      course: 'B.Tech EE',
      semester: 6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'usr_std_003',
      name: 'Sophia Lin',
      email: 'sophia@example.com',
      role: 'student',
      studentId: 'CS2026-0112',
      department: 'Computer Science & Engineering',
      course: 'B.Tech CS',
      semester: 4,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast handler
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Demo user switcher
  const switchDemoUser = (targetRole: UserRole) => {
    setRole(targetRole);
    setCurrentUser(DEMO_USERS[targetRole]);
    setActiveTab('home');
    addToast('Switched User Role', `Now logged in as ${DEMO_USERS[targetRole].name} (${targetRole.toUpperCase()})`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Logged Out', 'You have been signed out successfully.', 'info');
  };

  const login = (email: string, targetRole: UserRole) => {
    const foundUser = DEMO_USERS[targetRole];
    if (foundUser) {
      setCurrentUser(foundUser);
      setRole(targetRole);
      setActiveTab('home');
      addToast('Welcome Back!', `Logged in as ${foundUser.name}`, 'success');
      return true;
    }
    return false;
  };

  // Faculty Attendance Session Management
  const startFacultySession = (subjectCode: string, room: string, durationMinutes: number): AttendanceSession => {
    const foundSubject = attendanceSubjects.find(s => s.code === subjectCode);
    const newSession: AttendanceSession = {
      id: 'sess_' + Date.now(),
      subjectCode,
      subjectName: foundSubject ? foundSubject.name : subjectCode,
      facultyId: currentUser?.id || 'usr_fac_001',
      facultyName: currentUser?.name || 'Faculty Member',
      room,
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiresAt: new Date(Date.now() + durationMinutes * 60 * 1000).toISOString(),
      activeToken: `SUPER_CAMPUS_${subjectCode}_${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
      scannedStudentIds: []
    };

    setActiveSession(newSession);
    addToast('Session Started ⚡', `Attendance QR generated for ${subjectCode} (${durationMinutes} mins)`, 'success');
    return newSession;
  };

  const endFacultySession = () => {
    if (activeSession) {
      setActiveSession({ ...activeSession, status: 'expired' });
      addToast('Session Ended', `Attendance session for ${activeSession.subjectCode} has been closed.`, 'info');
    }
  };

  // Student Attendance QR Scanning
  const markStudentAttendanceQR = (scannedToken: string) => {
    if (!activeSession || activeSession.status === 'expired') {
      return { success: false, message: 'No active attendance session found or session has expired.' };
    }

    if (new Date(activeSession.expiresAt).getTime() < Date.now()) {
      setActiveSession({ ...activeSession, status: 'expired' });
      return { success: false, message: 'Attendance QR session has expired.' };
    }

    const studentId = currentUser?.id || 'usr_std_001';
    if (activeSession.scannedStudentIds.includes(studentId)) {
      return { success: false, message: 'You have already marked attendance for this session!' };
    }

    // Mark as scanned
    setActiveSession(prev => prev ? {
      ...prev,
      scannedStudentIds: [...prev.scannedStudentIds, studentId]
    } : null);

    // Update Student Attendance record
    const newRecord: AttendanceRecord = {
      id: 'att_rec_' + Date.now(),
      sessionId: activeSession.id,
      subjectCode: activeSession.subjectCode,
      subjectName: activeSession.subjectName,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'present',
      method: 'qr_scan'
    };

    setAttendanceHistory(prev => [newRecord, ...prev]);

    // Update subject attended count
    setAttendanceSubjects(prev => prev.map(sub => {
      if (sub.code === activeSession.subjectCode) {
        const newAttended = sub.attendedClasses + 1;
        const newTotal = sub.totalClasses + 1;
        const newPct = Number(((newAttended / newTotal) * 100).toFixed(1));
        return {
          ...sub,
          attendedClasses: newAttended,
          totalClasses: newTotal,
          percentage: newPct
        };
      }
      return sub;
    }));

    addToast('Attendance Marked! 🎉', `Successfully checked in for ${activeSession.subjectName}`, 'success');
    return { success: true, message: `Checked in for ${activeSession.subjectName}!` };
  };

  // Wallet Actions
  const topUpWallet = (amount: number, method: string) => {
    setWalletBalance(prev => Number((prev + amount).toFixed(2)));
    const newTx: WalletTransaction = {
      id: 'tx_' + Date.now(),
      type: 'topup',
      category: 'Wallet',
      amount,
      title: `Wallet Recharge via ${method}`,
      merchantOrSender: `Bank Account / ${method}`,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'success',
      referenceId: 'TOPUP-' + Math.floor(100000 + Math.random() * 900000)
    };
    setWalletTransactions(prev => [newTx, ...prev]);
    addToast('Wallet Recharged! 💳', `$${amount.toFixed(2)} added to your campus wallet.`, 'success');
  };

  const makePayment = (amount: number, title: string, merchant: string, category: WalletTransaction['category']) => {
    if (walletBalance < amount) {
      addToast('Insufficient Balance', `You need $${(amount - walletBalance).toFixed(2)} more to complete this payment.`, 'error');
      return false;
    }

    setWalletBalance(prev => Number((prev - amount).toFixed(2)));
    const newTx: WalletTransaction = {
      id: 'tx_' + Date.now(),
      type: 'payment',
      category,
      amount,
      title,
      merchantOrSender: merchant,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'success',
      referenceId: 'TXN' + Math.floor(10000000 + Math.random() * 90000000)
    };
    setWalletTransactions(prev => [newTx, ...prev]);
    addToast('Payment Successful! ✅', `$${amount.toFixed(2)} paid to ${merchant}`, 'success');
    return true;
  };

  // Event Registration
  const registerForEvent = (eventId: string) => {
    const userId = currentUser?.id || 'usr_std_001';
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        if (!evt.registeredUserIds.includes(userId)) {
          return {
            ...evt,
            registeredCount: evt.registeredCount + 1,
            registeredUserIds: [...evt.registeredUserIds, userId]
          };
        }
      }
      return evt;
    }));

    const targetEvt = events.find(e => e.id === eventId);
    if (targetEvt) {
      // Add notification
      const newNotif: NotificationItem = {
        id: 'notif_' + Date.now(),
        title: 'Event Registration Confirmed 🎟️',
        message: `You registered for "${targetEvt.title}". Check your entry ticket!`,
        category: 'event',
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      addToast('Ticket Booked! 🎟️', `Registered for ${targetEvt.title}`, 'success');
    }
  };

  const cancelEventRegistration = (eventId: string) => {
    const userId = currentUser?.id || 'usr_std_001';
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          registeredCount: Math.max(0, evt.registeredCount - 1),
          registeredUserIds: evt.registeredUserIds.filter(id => id !== userId)
        };
      }
      return evt;
    }));
    addToast('Registration Cancelled', 'Your ticket has been cancelled.', 'info');
  };

  const createEvent = (newEvent: Omit<Event, 'id' | 'registeredCount' | 'registeredUserIds'>) => {
    const created: Event = {
      ...newEvent,
      id: 'evt_' + Date.now(),
      registeredCount: 0,
      registeredUserIds: []
    };
    setEvents(prev => [created, ...prev]);
    addToast('Event Published! 🚀', `"${newEvent.title}" is live for campus registration.`, 'success');
  };

  // Marketplace
  const addMarketplaceListing = (newListing: Omit<MarketplaceListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerDept' | 'postedDate' | 'status'>) => {
    const created: MarketplaceListing = {
      ...newListing,
      id: 'mkt_' + Date.now(),
      sellerId: currentUser?.id || 'usr_std_001',
      sellerName: currentUser?.name || 'Alex Rivera',
      sellerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      sellerDept: currentUser?.department || 'Computer Science',
      postedDate: 'Just now',
      status: 'active'
    };
    setMarketplaceListings(prev => [created, ...prev]);
    addToast('Item Listed! 🛍️', `Your listing "${newListing.title}" is live in the student marketplace.`, 'success');
  };

  const toggleFavoriteListing = (id: string) => {
    setMarketplaceListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    }));
  };

  // Announcements & Notifications
  const addAnnouncement = (newAnc: Omit<Announcement, 'id' | 'date'>) => {
    const created: Announcement = {
      ...newAnc,
      id: 'anc_' + Date.now(),
      date: 'Just now'
    };
    setAnnouncements(prev => [created, ...prev]);

    // Push notification to students
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: `📢 ${newAnc.title}`,
      message: newAnc.description.slice(0, 100) + '...',
      category: 'announcement',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast('Announcement Sent! 📢', `Broadcasted to ${newAnc.targetDept}`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const toggleUserStatus = (userId: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        addToast('User Status Updated', `Toggled account state for ${u.name}`, 'info');
      }
      return u;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        setRole,
        switchDemoUser,
        logout,
        login,

        activeTab,
        setActiveTab,
        mobileFrameMode,
        setMobileFrameMode,
        darkMode,
        setDarkMode,

        todayClasses,
        attendanceSubjects,
        attendanceHistory,
        activeSession,
        startFacultySession,
        endFacultySession,
        markStudentAttendanceQR,

        walletBalance,
        walletTransactions,
        topUpWallet,
        makePayment,

        events,
        registerForEvent,
        cancelEventRegistration,
        createEvent,

        locations,

        marketplaceListings,
        addMarketplaceListing,
        toggleFavoriteListing,

        announcements,
        addAnnouncement,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationCount,

        systemStats,
        allUsers,
        toggleUserStatus,

        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
