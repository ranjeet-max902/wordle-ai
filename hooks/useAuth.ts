import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export function useAuth() {
    const { address, isConnected, status } = useAccount();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent hydration mismatch by returning safe defaults until mounted
    if (!isMounted) {
        return {
            address: undefined,
            isConnected: false,
            status: 'disconnected',
            isMounted: false,
        };
    }

    return {
        address,
        isConnected,
        status,
        isMounted: true,
    };
}
