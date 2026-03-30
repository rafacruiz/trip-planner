
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const launchConfetti = () => (
    <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
    />
);

const TripCountdown = ({ revealDate }) => {

    const targetDate = new Date(revealDate);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hrs = Math.floor((seconds % 86400) / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${days}d ${hrs}h ${mins}m ${secs}s`;
    };

    const getTimeRemaining = () => {
        const now = new Date().getTime();
        return Math.max(0, Math.floor((targetDate.getTime() - now) / 1000));
    };

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remaining = getTimeRemaining();

            setTimeLeft(remaining);

            if (remaining <= 0) {
                setIsComplete(true);
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {isComplete ? (
                <>
                    {launchConfetti()}
                    <span>00:00:00</span>
                </>
            ) : (
                <span>{ formatTime(timeLeft) }</span>
            )}
        </div>
    );
};

export default TripCountdown;