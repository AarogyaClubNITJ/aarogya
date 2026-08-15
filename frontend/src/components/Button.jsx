import flower from '../assets/whiteflower.png'


const Button = ({buttonColor,textColor,buttonText,redirect }) => {
    const handleclick = () => {
        if (redirect) {
            window.location.href = redirect;
        }
    };
    
    return (
        <div onClick={redirect ? handleclick : undefined} className="rounded-2xl px-3 sm:px-6 py-1 flex border-solid border-black border items-center cursor-pointer" style={{ backgroundColor: buttonColor, color: textColor, boxShadow: "rgba(0,0,0,1) 3px 3px" }}>
            <div className=' font-semibold '>{buttonText}</div>
            <img src={flower} alt="flower" className="w-6 h-6 ml-2 object-contain" />
        </div>
    )
}

export default Button