import Hero from './Hero'
import WhoAreWe from './WhoAreWe'
import WhatWeDo from './WhatWeDo'
import Professors from './Professors'
import Timeline from './Timeline'

const Mainpage = () => {
    return (
        <>
            <Hero />
            <div  className='bg-[#D8F7FF] flex flex-col items-center font-Basic h-auto'>
                <WhoAreWe />
                <Timeline />
                <WhatWeDo />
                <Professors />
            </div>

        </>

    )
}

export default Mainpage