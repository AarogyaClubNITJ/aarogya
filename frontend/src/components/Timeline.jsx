import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const Timeline = () => {
    return (
        <>
            <div id='events' className='flex flex-col justify-center items-center'>
                <div className='relative'>
                    <h2 className="absolute text-4xl sm:text-5xl lg:text-7xl font-bold text-[#406ED5]">
                        EVENTS
                    </h2>
                    <h2 id='stroke1' className="mx-[2px] text-4xl sm:text-5xl lg:text-7xl font-bold text-[#808080]">
                        EVENTS
                    </h2>
                </div>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#406ED5', color: '#fff', }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        iconStyle={{ background: '#E5A538', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title font-bold text-2xl">Free Eye Checkup Camp</h3>
                        <h4 className="vertical-timeline-element-subtitle text-[12px]">21<sup>st</sup> August, 2024</h4>
                        <p >
                            Aarogya club organised free eye checkup camp where 200+ students,professors & institute workers recieved essential eye care.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#E5A538', color: '#fff' }}

                    >
                        <h3 className="vertical-timeline-element-title font-bold text-2xl">Biggest Blood Donation Camp of NITJ</h3>
                        <h4 className="vertical-timeline-element-subtitle text-[12px]">06<sup>th</sup> September, 2024</h4>
                        <p>
                            The Aarogya Club and NSS organized a successful Blood Donation Camp on September 6, 2024, under the theme " YOUR BLOOD, THEIR LIFELINE: BE A SAVIOR. " In collaboration with the medical team from PIMS Hospital, the camp attracted over 160 + donors — the highest participation recorded in recent years
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#406ED5', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        iconStyle={{ background: '#E5A538', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title font-bold text-2xl">NITJ Half Marathon 2025</h3>
                        <h4 className="vertical-timeline-element-subtitle text-[12px]">15<sup>th</sup> February, 2025</h4>
                        <p  >
                            Aarogya Club successfully organized the first edition of the NITJ HALF MARATHON, with 400+ participants, making it a huge success. Centered around the theme "PACE FOR POSITIVITY - LEAVE STRESS BEHIND," the event promoted physical fitness and mental well-being, encouraging a stress-free lifestyle among students and faculty.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>

        </>
    )
}

export default Timeline