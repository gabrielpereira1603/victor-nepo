import * as React from "react";

function LoadingIconComponent(props: any) {
    return (
        <svg
            height={props.height || 512}
            width={props.width || 512}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            className={`animate-spin ${props.className || ''}`}
            style={{ animation: "spin 1s linear infinite" }}
            {...props}
        >
            <path d="M13 1v2a1 1 0 01-2 0V1a1 1 0 012 0zm-1 19a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1zm-8-8a1 1 0 00-1-1H1a1 1 0 000 2h2a1 1 0 001-1zm19-1h-2a1 1 0 000 2h2a1 1 0 000-2zm-4.982-9.382a1 1 0 00-1.367.364l-1 1.731a1 1 0 00.365 1.366.987.987 0 00.5.135 1 1 0 00.866-.5l1-1.731a1 1 0 00-.364-1.365zM7.987 18.921a1 1 0 00-1.366.364l-1 1.731a1 1 0 00.364 1.366.989.989 0 00.5.135 1 1 0 00.867-.5l1-1.731a1 1 0 00-.365-1.365zm-3.272-12.3l-1.731-1a1 1 0 00-1 1.731l1.731 1a1 1 0 001-1.731zm17.3 10.03l-1.731-1a1 1 0 00-1 1.731l1.731 1a.987.987 0 00.5.135 1 1 0 00.5-1.866zM7.349 1.982a1 1 0 00-1.731 1l1 1.731a1 1 0 00.866.5.987.987 0 00.5-.135 1 1 0 00.365-1.366zm10.03 17.3a1 1 0 00-1.731 1l1 1.731a1 1 0 001.731-1zm2.408-10.8a1 1 0 00.5-.134l1.731-1a1 1 0 00-1-1.731l-1.731 1a1 1 0 00.5 1.865zM3.713 15.648l-1.731 1a1 1 0 00.5 1.866.987.987 0 00.5-.135l1.731-1a1 1 0 00-1-1.731z" />
        </svg>
    );
}

export default LoadingIconComponent;
