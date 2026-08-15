

const Marquee = () => {

    const name=[
        'COMPETITIONS',
        'HEALTH CHECKUP CAMPS',
        'MARATHON',
        'CYCLOTHON',
        'BLOOD DONATION CAMP'
    ]
  return (
    <>
    <div className="flex gap-10 overflow-hidden mt-8">
        {name.map((names,key)=>(
            <h3 className="flex shrink-0 text-5xl " key={key}>{names}</h3>
            
        ))}
    </div>
    </>
  )
}

export default Marquee