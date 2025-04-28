import { useEffect } from "react";

interface AlertProps {
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    body?: string;
    duration?: number;
    setShowAlert?: (show: boolean) => void;
}
const typeStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
};

const Alert =({type, title, body = '', duration = 3000, setShowAlert} : AlertProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            if (setShowAlert) {
                setShowAlert(false);
            }
        }, duration);
    
        return () => clearTimeout(timer);
      }, [duration, setShowAlert]);

    return (
        <div className={`border-l-4 p-4 fixed top-4 right-0 ${typeStyles[type]}`} role="alert">
            <p className="font-bold text-sm">{title}</p>
            {body && <p className="text-sm">{body}</p>}
    </div>
    )
}
export default Alert;