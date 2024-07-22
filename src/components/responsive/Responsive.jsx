
import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
};

export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    return isMobile ? children : null;
};
