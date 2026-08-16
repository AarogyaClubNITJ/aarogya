 import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Team from './components/Team'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainpage from './components/Mainpage'
import Gallery from './components/Gallery'
import MainBlood from './components/MainBlood'
import Quiz from './components/Quiz'
import LaunchScreen from './components/LaunchScreen'
import { AuthProvider } from './context/AuthContext'
import VisitCounter from './components/counter'
import AdminLogin from './quizorientation/AdminLogin'
import DisplayScreen from './quizorientation/DisplayScreen'
import OrientationJoin from './quizorientation/OrientationJoin'
import ActiveQuiz from './quizorientation/ActiveQuiz'


const router=createBrowserRouter(

  [
    {
      path:"/launch",
      element: <LaunchScreen />
    },
    {
      path:"/",
      element: 
        <div >
          <Navbar />
          <Mainpage />
          <Footer />
        </div>
    },
    {
      path:"/team",
      element: 
      <div>
        <Navbar />
        <Team />  
      </div>
      
    },
    {
      path:"/gallery",
      element: 
      <div>
        <Navbar />
        <Gallery />
      </div>

    },
    {path:"/bloodbank",
      element:
      <div>
        <Navbar/>
        <MainBlood/>
        
      </div>
    },
    {path:"/quiz",
      element:
      <div className='min-h-screen'>
        <Navbar/>
        <Quiz/>
      </div>
    },
    {
      path:"/orientation/admin",
      element: <AdminLogin/>
    },
    {
      path:"/orientation/display",
      element: <DisplayScreen/>
    },
    {
      path:"/orientation/join",
      element: <OrientationJoin/>
    },
    {
      path:"/orientation/play",
      element: <ActiveQuiz/>
    }
  ]
)

function App() {
  return (
    <AuthProvider>
      <div className="relative min-h-screen">
        <RouterProvider router={router} />
        <VisitCounter /> 
      </div>
    </AuthProvider>
  )
}

export default App
