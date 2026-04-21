import os
import re

def check_icons(directory):
    icon_usage_pattern = re.compile(r'<([A-Z][a-zA-Z0-9]+)')
    
    # Improved import pattern to handle multiline imports
    # This finds the entire import block from lucide-react
    lucide_import_block_pattern = re.compile(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"]', re.DOTALL)
    
    missing_count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jsx', '.js')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    icons_used = set(icon_usage_pattern.findall(content))
                    
                    # Basic exclusion list
                    ignore = {'React', 'Fragment', 'Route', 'Routes', 'Navigate', 'Link', 'AnimatePresence', 'motion', 'ResponsiveContainer', 'AreaChart', 'Area', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Area', 'BarChart', 'Bar', 'PieChart', 'Pie', 'Cell', 'BarChart3', 'Timeline', 'Box', 'Container', 'Card', 'Button', 'Input', 'Image', 'Stack', 'Typography', 'Main', 'Header', 'Footer', 'Navbar', 'StudentDashboard', 'FacultyDashboard', 'AdminDashboard', 'Profile', 'Login', 'RoleLogin', 'Home', 'ProtectedRoute', 'DepartmentSelection', 'Departments', 'DepartmentDetail', 'Courses', 'CourseDetail', 'UploadCenter', 'QuickSchedulePage', 'Announcements', 'LiveClass', 'Assignments', 'NotificationListener', 'FluidBackground', 'AchievementToaster', 'ScrollToTop', 'LockedOverlay', 'GlobalAlertMarquee', 'SplashScreen', 'QuizCenter', 'QuizArena', 'InstitutionalAlert', 'MonthlyRegister', 'AttendanceManager', 'PerformanceGraph', 'StatsGrid', 'AssignmentHub', 'AssignmentInterface', 'ActivityCalendar', 'RewardCatalog', 'ResourceList', 'SubmissionList', 'AdminUserManagement', 'AdminTeacherAttendance', 'AdminCourseManagement', 'AdminSystemSettings', 'AdminGlobalBroadcasts', 'AdminResultHub', 'AdminBatchFinalization', 'AdminAiManagement', 'AdminAccessRequests', 'AdminPendingTeachers', 'AdminUserAiDetail', 'QuickScheduleAdd', 'ActiveScheduleTasks', 'IntelligenceTerminal', 'DispatchHub', 'CompletionPreview', 'SidebarNav', 'Chatbot', 'ReactMarkdown', 'Helmet', 'GoogleMap', 'Chart', 'Doughnut', 'Line', 'Radar', 'PolarArea', 'Bubble', 'Scatter', 'RoleLogin', 'MFAVerify', 'RoleSelect', 'Register', 'FaceLoginPage', 'FaceRegistrationPage', 'App', 'AppContent', 'LiveNotification', 'MessagePort', 'Object'}
                    
                    icons_used = {i for i in icons_used if i not in ignore}
                    
                    # Find icons imported from lucide-react
                    imports = set()
                    matches = lucide_import_block_pattern.findall(content)
                    for match in matches:
                        # Split by comma and clean up whitespace/newlines
                        symbols = [s.strip() for s in re.split(r'[,\s\n\r]+', match) if s.strip()]
                        imports.update(symbols)
                    
                    # Handle single line non-curly imports or other lucide-react patterns if any
                    # (Standard lucide-react uses curly braces)
                    
                    missing = icons_used - imports
                    if missing:
                        # Final check: is the symbol defined anywhere in the file (e.g. locally defined component)?
                        verified_missing = set()
                        for m in missing:
                            # If it's used as a component <Zap but not defined as const Zap or function Zap
                            if not re.search(r'(const|let|var|function)\s+' + m + r'\b', content):
                                verified_missing.add(m)
                                
                        if verified_missing:
                            print(f"File: {path}")
                            print(f"  Missing: {verified_missing}")
                            missing_count += len(verified_missing)
    return missing_count

if __name__ == "__main__":
    count = check_icons('client/src')
    print(f"\nTotal verified missing imports: {count}")
