import { useState, useEffect } from 'react';

export function useInputFocus(ref) {
    const [isFocused, setIsFocused] = useState(false);
    
    useEffect(() => {
        const element = ref.current;
        
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);
        
        if (element) {
            element.addEventListener('focus', handleFocus);
            element.addEventListener('blur', handleBlur);
            
            // Check initial state
            setIsFocused(document.activeElement === element);
        }
        
        return () => {
            if (element) {
                element.removeEventListener('focus', handleFocus);
                element.removeEventListener('blur', handleBlur);
            }
        };
    }, [ref]);
    
    return isFocused;
}