import {
  User,
  ClassScheduleItem,
  AttendanceSubject,
  AttendanceRecord,
  WalletTransaction,
  Event,
  CampusLocation,
  MarketplaceListing,
  Announcement,
  NotificationItem,
  SystemStats
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  student: {
    id: 'usr_std_001',
    name: 'Alex Rivera',
    email: 'student@example.com',
    role: 'student',
    studentId: 'CS2026-0892',
    department: 'Computer Science & Engineering',
    course: 'B.Tech Computer Science',
    semester: 6,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (555) 234-5678'
  },
  faculty: {
    id: 'usr_fac_001',
    name: 'Dr. Sarah Jenkins',
    email: 'faculty@example.com',
    role: 'faculty',
    facultyId: 'FAC-CS-402',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (555) 876-5432'
  },
  admin: {
    id: 'usr_adm_001',
    name: 'Dean Marcus Vance',
    email: 'admin@example.com',
    role: 'admin',
    adminRole: 'Super Administrator',
    department: 'Campus Administration',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (555) 999-0000'
  }
};

export const INITIAL_TODAY_CLASSES: ClassScheduleItem[] = [
  {
    id: 'cls_1',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures & Algorithms',
    facultyName: 'Dr. Sarah Jenkins',
    room: 'Lab 402 - Tech Block A',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    status: 'ongoing',
    attendanceSessionId: 'sess_live_101'
  },
  {
    id: 'cls_2',
    subjectCode: 'CS304',
    subjectName: 'Full-Stack Web Engineering',
    facultyName: 'Prof. David Chen',
    room: 'Hall B - Innovation Center',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    status: 'upcoming'
  },
  {
    id: 'cls_3',
    subjectCode: 'CS308',
    subjectName: 'Database Management Systems',
    facultyName: 'Dr. Maria Rodriguez',
    room: 'Lab 201 - CS Block',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    status: 'upcoming'
  },
  {
    id: 'cls_4',
    subjectCode: 'MA201',
    subjectName: 'Discrete Mathematics & Probability',
    facultyName: 'Prof. Alan Turing',
    room: 'Lec Hall 105',
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    status: 'upcoming'
  }
];

export const INITIAL_ATTENDANCE_SUBJECTS: AttendanceSubject[] = [
  {
    id: 'sub_1',
    code: 'CS301',
    name: 'Advanced Data Structures',
    faculty: 'Dr. Sarah Jenkins',
    totalClasses: 36,
    attendedClasses: 33,
    percentage: 91.6,
    targetPercentage: 75
  },
  {
    id: 'sub_2',
    code: 'CS304',
    name: 'Full-Stack Web Engineering',
    faculty: 'Prof. David Chen',
    totalClasses: 32,
    attendedClasses: 28,
    percentage: 87.5,
    targetPercentage: 75
  },
  {
    id: 'sub_3',
    code: 'CS308',
    name: 'Database Management Systems',
    faculty: 'Dr. Maria Rodriguez',
    totalClasses: 30,
    attendedClasses: 22,
    percentage: 73.3, // Warning: <75%
    targetPercentage: 75
  },
  {
    id: 'sub_4',
    code: 'MA201',
    name: 'Discrete Mathematics',
    faculty: 'Prof. Alan Turing',
    totalClasses: 40,
    attendedClasses: 38,
    percentage: 95.0,
    targetPercentage: 75
  },
  {
    id: 'sub_5',
    code: 'HS102',
    name: 'Professional Ethics & Soft Skills',
    faculty: 'Dr. Emily Watson',
    totalClasses: 20,
    attendedClasses: 19,
    percentage: 95.0,
    targetPercentage: 75
  }
];

export const INITIAL_ATTENDANCE_HISTORY: AttendanceRecord[] = [
  {
    id: 'att_rec_10',
    sessionId: 'sess_prev_99',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures',
    date: '2026-08-10',
    time: '09:05 AM',
    status: 'present',
    method: 'qr_scan'
  },
  {
    id: 'att_rec_9',
    sessionId: 'sess_prev_98',
    subjectCode: 'CS304',
    subjectName: 'Full-Stack Web Engineering',
    date: '2026-08-09',
    time: '11:02 AM',
    status: 'present',
    method: 'qr_scan'
  },
  {
    id: 'att_rec_8',
    sessionId: 'sess_prev_97',
    subjectCode: 'CS308',
    subjectName: 'Database Management Systems',
    date: '2026-08-08',
    time: '02:15 PM',
    status: 'absent',
    method: 'manual'
  },
  {
    id: 'att_rec_7',
    sessionId: 'sess_prev_96',
    subjectCode: 'MA201',
    subjectName: 'Discrete Mathematics',
    date: '2026-08-07',
    time: '04:01 PM',
    status: 'present',
    method: 'qr_scan'
  }
];

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_1001',
    type: 'payment',
    category: 'Cafeteria',
    amount: 8.50,
    title: 'Central Dining Hall — Lunch Combo',
    merchantOrSender: 'Campus Central Dining',
    date: 'Today, 12:45 PM',
    timestamp: Date.now() - 3600000 * 3,
    status: 'success',
    referenceId: 'TXN98234101'
  },
  {
    id: 'tx_1002',
    type: 'payment',
    category: 'Printing',
    amount: 3.20,
    title: 'Print Shop — Project Documentation (16 pgs)',
    merchantOrSender: 'Student Activity Center Print Hub',
    date: 'Yesterday, 03:15 PM',
    timestamp: Date.now() - 86400000,
    status: 'success',
    referenceId: 'TXN98234088'
  },
  {
    id: 'tx_1003',
    type: 'topup',
    category: 'Wallet',
    amount: 50.00,
    title: 'Wallet Recharge via UPI / Card',
    merchantOrSender: 'Bank of Campus / Card **** 4242',
    date: 'Aug 09, 2026',
    timestamp: Date.now() - 86400000 * 2,
    status: 'success',
    referenceId: 'TOPUP-449102'
  },
  {
    id: 'tx_1004',
    type: 'payment',
    category: 'Events',
    amount: 15.00,
    title: 'Hackathon 2026 Registration Ticket',
    merchantOrSender: 'ACM Student Chapter',
    date: 'Aug 07, 2026',
    timestamp: Date.now() - 86400000 * 4,
    status: 'success',
    referenceId: 'TXN98233950'
  },
  {
    id: 'tx_1005',
    type: 'payment',
    category: 'Campus Store',
    amount: 12.99,
    title: 'Super Campus Hoodie Sticker & Notepad',
    merchantOrSender: 'University Book Store',
    date: 'Aug 05, 2026',
    timestamp: Date.now() - 86400000 * 6,
    status: 'success',
    referenceId: 'TXN98233812'
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt_1',
    title: 'Hackathon 2026: AI & Campus Innovation',
    description: 'A 36-hour sprint where students build cutting-edge solutions for real-world campus & sustainability challenges. Food, swag, and $5,000 cash prizes!',
    category: 'Hackathons',
    date: 'Aug 25, 2026',
    time: '09:00 AM - 09:00 PM',
    venue: 'Innovation Center Auditorium & Lab 3',
    organizer: 'ACM Student Chapter & Google Developer Club',
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    registeredCount: 142,
    maxCapacity: 200,
    price: 15.00,
    isFeatured: true,
    registeredUserIds: ['usr_std_001']
  },
  {
    id: 'evt_2',
    title: 'Annual Campus Cultural Fest: Echoes 2026',
    description: 'Join us for music performances, battle of the bands, dance showcases, food stalls, and guest celebrity DJ night on the main quad!',
    category: 'Cultural',
    date: 'Sep 02, 2026',
    time: '04:00 PM - 11:00 PM',
    venue: 'Main Campus Quadrangle & Open Air Theater',
    organizer: 'Student Cultural Council',
    poster: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    registeredCount: 480,
    maxCapacity: 1000,
    price: 0,
    isFeatured: true,
    registeredUserIds: ['usr_std_001']
  },
  {
    id: 'evt_3',
    title: 'Cybersecurity & Cloud Systems Workshop',
    description: 'Hands-on training session on network security, zero-trust architecture, and AWS cloud deployment led by industry engineers.',
    category: 'Workshops',
    date: 'Aug 18, 2026',
    time: '02:00 PM - 05:00 PM',
    venue: 'CS Block Seminar Room 102',
    organizer: 'Department of Computer Science',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    registeredCount: 68,
    maxCapacity: 80,
    price: 0,
    registeredUserIds: []
  },
  {
    id: 'evt_4',
    title: 'Inter-College Basketball Championship Finals',
    description: 'Cheer for our Super Campus Titans as they battle Rivals State University in the championship final match!',
    category: 'Sports',
    date: 'Aug 20, 2026',
    time: '05:30 PM - 08:00 PM',
    venue: 'Indoor Sports Arena Court 1',
    organizer: 'Campus Athletics Department',
    poster: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    registeredCount: 230,
    maxCapacity: 350,
    price: 0,
    registeredUserIds: []
  }
];

export const INITIAL_LOCATIONS: CampusLocation[] = [
  {
    id: 'loc_1',
    name: 'Central University Library',
    category: 'Library',
    building: 'Block B - Academic Complex',
    floor: 'Floors 1 - 3',
    coordinates: { x: 35, y: 40 },
    description: 'State-of-the-art quiet study spaces, digital research labs, printer stations, and 100,000+ print volumes.',
    openHours: '08:00 AM - 11:00 PM Daily',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc_2',
    name: 'Innovation & Tech Center (Lab 402)',
    category: 'Labs',
    building: 'Tech Block A',
    floor: '4th Floor',
    coordinates: { x: 60, y: 30 },
    description: 'High-performance computing lab with 60 GPU workstations for AI, graphics, and computer science courses.',
    openHours: '08:30 AM - 08:00 PM Mon-Fri',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc_3',
    name: 'Central Dining Hall & Food Court',
    category: 'Cafeteria',
    building: 'Student Union Building',
    floor: 'Ground Floor',
    coordinates: { x: 48, y: 65 },
    description: 'Offers hot meals, healthy salad bars, smoothie stations, coffee shop, and digital QR wallet payment options.',
    openHours: '07:00 AM - 09:30 PM Daily',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc_4',
    name: 'Main Auditorium & Event Complex',
    category: 'Auditorium',
    building: 'Arts & Culture Center',
    floor: 'Main Hall',
    coordinates: { x: 75, y: 55 },
    description: '1,200-seat theater with full stage lighting and acoustics for guest lectures, cultural shows, and conferences.',
    openHours: 'As per event schedule',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc_5',
    name: 'Pioneer Hall (Men Hostel A)',
    category: 'Hostels',
    building: 'Residential Zone North',
    floor: '4 Floors',
    coordinates: { x: 20, y: 20 },
    description: 'Resident student dormitories with Wi-Fi, laundry facilities, study lounges, and 24/7 security access.',
    openHours: '24/7 Access for Residents',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc_6',
    name: 'Indoor Sports Complex & Gymnasium',
    category: 'Sports',
    building: 'Athletic Center',
    floor: 'Ground & Basement',
    coordinates: { x: 80, y: 25 },
    description: 'Full basketball court, badminton, table tennis room, weight training gym, and locker facilities.',
    openHours: '06:00 AM - 10:00 PM Daily',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: 'mkt_1',
    title: 'MacBook Air M1 (8GB / 256GB) - Great Condition',
    description: 'Selling my MacBook Air used for 2 semesters of CS courses. Runs smoothly, battery health 88%. Includes original charger and sleeve.',
    price: 480.00,
    category: 'Electronics',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_std_002',
    sellerName: 'Marcus Vance Jr.',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    sellerDept: 'Electrical Engineering',
    location: 'Hostel Block B / Library Quad',
    postedDate: '2 hours ago',
    status: 'active',
    isFavorite: false
  },
  {
    id: 'mkt_2',
    title: 'Data Structures & Algorithms in Java (4th Edition)',
    description: 'Clean textbook with no highlighted pages or writing. Perfect for CS301 course requirements.',
    price: 35.00,
    category: 'Books',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_std_003',
    sellerName: 'Sophia Lin',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    sellerDept: 'Computer Science',
    location: 'Student Union Cafeteria',
    postedDate: 'Yesterday',
    status: 'active',
    isFavorite: true
  },
  {
    id: 'mkt_3',
    title: 'Ergonomic Desk Chair for Study Room',
    description: 'Adjustable mesh office chair with lumbar support. Super comfortable for long coding sessions.',
    price: 45.00,
    category: 'Furniture',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_std_004',
    sellerName: 'Daniel Kim',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    sellerDept: 'Mechanical Engineering',
    location: 'Pioneer Hall Dorm 204',
    postedDate: '3 days ago',
    status: 'active'
  },
  {
    id: 'mkt_4',
    title: 'Full Semester Hand-written Class Notes: Discrete Math (MA201)',
    description: 'Neatly written, color-coded complete lecture notes + solved exam papers for Discrete Mathematics. Guaranteed to boost your grade!',
    price: 12.00,
    category: 'Notes',
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_std_001',
    sellerName: 'Alex Rivera (You)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    sellerDept: 'Computer Science',
    location: 'Online PDF / Printed Copy',
    postedDate: '4 days ago',
    status: 'active'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc_1',
    title: '🚨 Mid-Semester Examination Schedule Released (Fall 2026)',
    description: 'The official timetable for Mid-Semester examinations has been published on the student portal. Exams start Sep 15th. Please check room allocations.',
    author: 'Dean Marcus Vance',
    authorRole: 'Dean',
    date: 'Today, 10:00 AM',
    priority: 'urgent',
    targetDept: 'All Departments'
  },
  {
    id: 'anc_2',
    title: '📚 Central Library Hours Extended for Exam Preparation',
    description: 'Starting next Monday, the Central Library will remain open until 02:00 AM daily. Night quiet rooms and printer kiosks will be fully active.',
    author: 'Library Administration',
    authorRole: 'Admin',
    date: 'Yesterday, 02:30 PM',
    priority: 'important',
    targetDept: 'All Departments'
  },
  {
    id: 'anc_3',
    title: '💡 Hackathon 2026 Pitch Submissions Now Open',
    description: 'Teams interested in participating in the AI & Campus Innovation Hackathon can submit their team proposals before Aug 22nd midnight.',
    author: 'Dr. Sarah Jenkins',
    authorRole: 'Faculty',
    date: 'Aug 09, 2026',
    priority: 'normal',
    targetDept: 'Computer Science & Engineering'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Low Attendance Warning ⚠️',
    message: 'Your attendance in Database Management Systems (CS308) is 73.3%, which is below the mandatory 75% threshold.',
    category: 'attendance',
    timestamp: '10 mins ago',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Wallet Top-Up Successful 💳',
    message: '$50.00 added to your Campus Digital Wallet via Card ****4242.',
    category: 'wallet',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Event Registration Confirmed 🎉',
    message: 'You are registered for Hackathon 2026. Your digital entry QR ticket is ready.',
    category: 'event',
    timestamp: 'Yesterday',
    read: true
  },
  {
    id: 'notif_4',
    title: 'New Announcement Posted 📢',
    message: 'Mid-Semester Examination Schedule Released (Fall 2026).',
    category: 'announcement',
    timestamp: 'Yesterday',
    read: true
  }
];

export const INITIAL_SYSTEM_STATS: SystemStats = {
  totalStudents: 3480,
  totalFaculty: 185,
  activeUsersToday: 2190,
  overallAttendanceRate: 88.4,
  walletTransactionsTotal: 14250,
  activeEventsCount: 12,
  marketplaceListingsCount: 148
};
