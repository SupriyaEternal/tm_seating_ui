import React from "react";
import type { UserType } from "./user";

export interface AppContextType {
    backendURL: string;
}

export interface AppProviderPropsType {
    children: React.ReactNode;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    Login: (email: string, password: string) => Promise<void>;
    Logout: () => Promise<void>;
    CheckAuth: () => Promise<void>;
}

export interface LiveImages  {
    camera1: string[];
    camera2: string[];
    camera3: string[];
    camera4: string[];
    camera5: string[];
};
export interface AuthProviderPropsType {
    children: React.ReactNode;
}

export interface NATSContextType  {

    isConnected: boolean;
    images: LiveImages;
    setImages: React.Dispatch<React.SetStateAction<LiveImages>>;
    inspectionResult: any;
    setInspectionResult: React.Dispatch<any>;
    cameraDetails: any;
    setCameraDetails: React.Dispatch<any>;
    machineState: string;
    plc: string;
    cameraStatus1: object;
    cameraStatus2: object;
    cameraStatus3: object;
    cameraStatus4: object;
    cameraStatus5: object;
    power: string;
    popupData: any;
    publishStartStop: (v: string) => void;
    publishDataCollection: (v: boolean) => void;
    publishMasterData: (v: any) => void;
    publishDataCollectionData: (v: any) => void;
    publishShutdown: (v: boolean) => void;
    publishFGPartNumber: (v: string) => void;
};
