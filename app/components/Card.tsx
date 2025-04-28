'use client';

import Image from "next/image";
import { User } from "../types/user";
import Link from "next/link";

interface CardProps {
    user: User;
}
const Card = ({user}: CardProps) => {
    
    return(
        <Link href={`/users/${user.id}`} key={user.id} className="block"> {/* Envuelve la tarjeta con Link y usa la clase 'block' para que ocupe todo el espacio */}
            <div key={user.id} className="bg-gray-300 flex flex-col items-center dark:bg-gray-600 shadow-md rounded-xl p-4">
                <Image 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    width={100} 
                    height={100} 
                    sizes="100px"
                    className="rounded-full mb-4"
                    />
                <h2 className="text-xl font-semibold mt-2">{`${user.first_name} ${user.last_name}`}</h2>
                <p className="text-sm text-gray-800">{user.email}</p>
            </div>
        </Link>
    )
}
export default Card;