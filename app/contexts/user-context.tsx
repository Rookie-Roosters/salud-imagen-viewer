import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

type UserType = 'patient' | 'doctor';

interface UserContextType {
    userType: UserType;
    isPatient: boolean;
    isDoctor: boolean;
    patientId?: string;
}

const UserContext = createContext<UserContextType>({
    userType: 'doctor', // Default is doctor
    isPatient: false,
    isDoctor: true,
    patientId: undefined,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [userType, setUserType] = useState<UserType>('doctor');
    const [patientId, setPatientId] = useState<string | undefined>(undefined);

    useEffect(() => {
        // Check URL for patient parameter
        const url = new URL(window.location.href);
        const patientParam = url.searchParams.get('patient');

        if (patientParam) {
            setUserType('patient');
            setPatientId(patientParam);
        } else {
            setUserType('doctor');
            setPatientId(undefined);
        }
    }, [location]);

    const value = {
        userType,
        isPatient: userType === 'patient',
        isDoctor: userType === 'doctor',
        patientId,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
} 