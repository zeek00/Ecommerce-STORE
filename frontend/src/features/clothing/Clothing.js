import { React} from 'react'

const Clothing = (props) => {
    const {male, female} = props
    

    return (
        <div>
            {male.length > 0 ? male.map(item=>{

                return (
                    <li key={item.id}>
                        {item.category}

                    </li>
                )
            }): console.log()}

            {female.length > 0 ? female.map(item=>{

            return (
                <li key={item.id}>
                    {item.category}

                </li>
            )
            }): console.log()} 
        </div>
    );

}

export default Clothing;