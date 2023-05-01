import React from 'react';

// @ts-ignore
const MouseTrack = ({trackMouse}) => {
    const [mousePosition, setMousePosition] = React.useState([]);

    React.useEffect(() => {
        document.addEventListener('mousemove', trackMousePos);

        return () => {
            document.removeEventListener('mousemove', trackMousePos);
        }
    }, [])


    // @ts-ignore
    const trackMousePos = e => {
        setMousePosition(
            // @ts-ignore
            [...mousePosition , e.clientX, e.clientY]
        );
    };

    return (
        <div>
            <h3 className="app__title">Позиция курсора:</h3>
            <h2>
                X: {trackMouse ? mousePosition[0] : ' -'}
                <br />
                Y: {trackMouse ? mousePosition[1] : ' -'}
            </h2>
        </div>
    );
}



export default MouseTrack;