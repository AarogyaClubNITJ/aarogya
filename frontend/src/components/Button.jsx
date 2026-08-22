import flower from '../assets/whiteflower.png'


const Button = ({buttonColor,textColor,buttonText,redirect }) => {
    const handleclick = () => {
        if (redirect) {
            window.location.href = redirect;
        }
    };

    const handleKeyDown = (event) => {
        if (redirect && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            handleclick();
        }
    };
    
    return (
        <div
            onClick={redirect ? handleclick : undefined}
            onKeyDown={handleKeyDown}
            role={redirect ? 'link' : undefined}
            tabIndex={redirect ? 0 : undefined}
            className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-black/20 px-4 py-2 font-semibold tracking-wide shadow-[3px_3px_0_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[2px_2px_0_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 cursor-pointer"
            style={{ backgroundColor: buttonColor, color: textColor }}
        >
            <div>{buttonText}</div>
            <img src={flower} alt="" className="h-6 w-6 object-contain transition-transform duration-200 group-hover:rotate-12" />
        </div>
    )
}

export default Button