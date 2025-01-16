import axios from 'axios';
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
    const { user, loading } = useAuth();
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${user?.email}`)
            return data.role
        },
    })
    console.log(role)
    return [role, isLoading]
}

export default useRole