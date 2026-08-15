import {useEffect,useState} from 'react'
import BloodForm from './BloodForm'
import CheckBlood from './CheckBlood'
import Eligibility from './Eligibility'
import BloodAlly from './BloodAlly'
import Donors from './Donors'
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const MainBlood = () => {
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className={` sm:mx-6 lg:mx-0 transition-opacity duration-1000 ease-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}>
        <div className=' rounded-xl'>

        <CheckBlood/>
      <div className=" sm:px-8 mt-8">
        <BloodForm />
      </div>

        <BloodAlly/>
        <Eligibility/>
        <Donors/>
        </div>
    </div>
  )
}

export default MainBlood