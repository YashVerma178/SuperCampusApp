export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  phone?: string;
  // Role specific fields
  studentId?: string;
  course?: string;
  semester?: number;
  facultyId?: string;
  adminRole?: string;
}

export interface ClassScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:30 AM"
  status: 'upcoming' | 'ongoing' | 'completed';
  attendanceSessionId?: string;
}

export interface AttendanceSubject {
  id: string;
  code: string;
  name: string;
  faculty: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  targetPercentage: number;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
  method: 'qr_scan' | 'manual';
}

export interface AttendanceSession {
  id: string;
  subjectCode: string;
  subjectName: string;
  facultyId: string;
  facultyName: string;
  room: string;
  startTime: string;
  expiresAt: string; // ISO string
  activeToken: string; // Dynamic QR payload token
  status: 'active' | 'expired';
  scannedStudentIds: string[];
}

export interface WalletTransaction {
  id: string;
  type: 'topup' | 'payment' | 'refund';
  category: 'Cafeteria' | 'Library' | 'Printing' | 'Events' | 'Campus Store' | 'Wallet';
  amount: number;
  title: string;
  merchantOrSender: string;
  date: string;
  timestamp: number;
  status: 'success' | 'pending' | 'failed';
  referenceId: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshops' | 'Hackathons' | 'Clubs' | 'Seminars';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  poster: string;
  registeredCount: number;
  maxCapacity: number;
  price: number; // 0 for free
  isFeatured?: boolean;
  registeredUserIds: string[];
}

export interface CampusLocation {
  id: string;
  name: string;
  category: 'Classrooms' | 'Labs' | 'Departments' | 'Library' | 'Cafeteria' | 'Hostels' | 'Parking' | 'Auditorium' | 'Sports';
  building: string;
  floor: string;
  coordinates: { x: number; y: number }; // Percentage offsets on map 0-100
  description: string;
  openHours: string;
  image: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Books' | 'Notes' | 'Electronics' | 'Furniture' | 'Stationery' | 'Sports' | 'Services' | 'Other';
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerDept: string;
  location: string;
  postedDate: string;
  status: 'active' | 'sold' | 'reported';
  isFavorite?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  author: string;
  authorRole: 'Faculty' | 'Admin' | 'Dean';
  date: string;
  priority: 'urgent' | 'important' | 'normal';
  targetDept: string; // 'All' or specific dept
  read?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'attendance' | 'wallet' | 'event' | 'announcement' | 'marketplace' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface SystemStats {
  totalStudents: number;
  totalFaculty: number;
  activeUsersToday: number;
  overallAttendanceRate: number;
  walletTransactionsTotal: number;
  activeEventsCount: number;
  marketplaceListingsCount: number;
}
