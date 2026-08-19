import { FaGoogleDrive } from "react-icons/fa";
import footer from '../assets/footer/image1.svg'
import Button from './Button'
import cover from '../assets/cover.png';

const Footer = () => {
    return (
        <div className="relative bg-[#D8F7FF]">
            <div className="relative overflow-hidden">
            <img className='sm:h-[50vh] w-screen h-[25vh]' src={footer} alt="" />
            <img id="floating" src={cover} className="absolute w-3/6 -top-[20px] left-72 sm:flex hidden z-40" alt="" />
            </div>
            <div className="z-40 absolute sm:top-30 top-9 w-full justify-center flex">
                <Button buttonColor="#406ED5" textColor="white" buttonText="JOIN US" redirect="https://linktr.ee/aarogya_nitj" />
            </div>
            <div className="absolute bottom-0.5 left-0 w-auto pl-4 sm:pl-8">
                <div className="flex gap-4">
                    <a href="https://drive.google.com/drive/folders/1GRgUUkq7AJ3qC8rDfWL_FMFKWR6D4F03" target="_blank" rel="noreferrer" aria-label="Open Aarogya Google Drive" title="Google Drive">
                        <FaGoogleDrive size="1.7em" className="text-[#4285F4] cursor-pointer hover:opacity-75" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
