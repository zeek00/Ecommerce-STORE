import { React } from 'react'


const Jewelries = ({jewelries}) => {
    
    return (
        <div>

            {
                jewelries.length > 0 ? jewelries.map(item=>{
                return (
                    <li key={item.id}>
                        {item.title}

                    </li>
                )
                }): console.log()
            }

        </div>
    );

}

export default Jewelries;