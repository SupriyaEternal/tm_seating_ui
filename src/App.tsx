import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import DashboardLayout from './Layouts/DashboardLayout'
import OverviewScreen from './screens/dashboard/OverviewScreen'
import LoginScreen from './screens/auth/LoginScreen'
import UserSelectionPage from './screens/selection/UserSelectionScreen'
import UserInspectionModeSelectionScreen from './screens/selection/UserInspectionModeSelectionScreen.tsx'
import AnalyticsScreen from './screens/dashboard/AnalyticsScreen'
import ConfigureScreen from './screens/dashboard/ConfigureScreen'
import ReportsScreen from './screens/dashboard/ReportsScreen'
import SearchScreen from './screens/dashboard/SearchScreen'
import ProcessControlScreen from './screens/dashboard/ProcessControlScreen'
import DataCollectionScreen from './screens/data-collection/DataCollectionScreen'
import UserManagementScreen from './screens/user-management/UserManagementScreen'
import AutoInspectionScreen from './screens/inspection/AutoInspectionScreen.tsx'
import AutoInspectionCameraDetailScreen from './screens/inspection/AutoInspectionCameraDetailScreen.tsx'
import InspectionListScreen from './screens/inspection/InspectionListScreen.tsx'
import InspectionDetailsScreen from './screens/inspection/InspectionDetailsScreen.tsx'
import ManualInspectionScreen from './screens/inspection/ManualInspectionScreen'
import InspectionHealthScreen from './screens/inspection/InspectionHealthScreen'

const App = () => {

    return (
        <>
            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route element={<ProtectedRoute />}>

                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<OverviewScreen />} />
                        <Route path="analytics" element={<AnalyticsScreen />} />
                        <Route path="configure" element={<ConfigureScreen />} />
                        <Route path="reports" element={<ReportsScreen />} />
                        <Route path="process-control" element={<ProcessControlScreen />} />
                        <Route path="search" element={<SearchScreen />} />
                        <Route path="user-management" element={<UserManagementScreen/>}/>
                    </Route>

                    <Route path="/data-collection" element={<DataCollectionScreen/>}/>
                    
                    <Route path="/user-selection" element={<UserSelectionPage/>}/>
                    <Route path="/user-inspection-mode-selection" element={<UserInspectionModeSelectionScreen/>}/>
                    <Route path="/inspection/auto" element={<AutoInspectionScreen/>}/>
                    <Route path="/inspection/auto/camera/:cameraId" element={<AutoInspectionCameraDetailScreen/>}/>
                    <Route path="/inspection/auto/inspections/:status" element={<InspectionListScreen/>}/>
                    <Route path="/inspection/auto/inspection/:inspectionId" element={<InspectionDetailsScreen/>}/>
                    <Route path="/inspection/manual" element={<ManualInspectionScreen/>}/>
                    <Route path="/inspection/diagnostic" element={<InspectionHealthScreen/>}/>
                </Route>

                <Route path="/login" element={<LoginScreen />} />
            </Routes>  

        </>
    )
}

export default App