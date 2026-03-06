'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

type userContextType = {
user:userType | null | undefined,
setUser: (user:userType) => void
}

type userType = {
    name: string,
    email: string,
    image?: string
}

export const userDataContext = React.createContext<userContextType | undefined>(undefined)

function UserContext({ children }: { children: React.ReactNode }) {

    const session = useSession()

    const [user, setUser] = useState<userType | null>()

    const data = {
        user, setUser
    }

    useEffect(() => {
        async function getUser() {
            try {
                const result = await axios.get("/api/user")
                setUser(result.data)
            } catch (error) {
                console.log("error in userContext:", error)
            }
        }
        getUser()
    }, [session])
    return (
       <userDataContext.Provider value={data}>
        {children}
       </userDataContext.Provider>
    )
}

export default UserContext
