import styles from './InfoPanel.module.css';
import { clsx } from 'clsx';

export enum InfoPanelList {
    information = 'information',
    success = 'success',
    error = 'error',
}

interface InfoPanelProps {
    text: string;
    type: InfoPanelList;
}

export const InfoPanel = (props: InfoPanelProps) => {
    const {type, text} = props;
    const wrapperClass = clsx(styles[type], styles.infoPanel)

    return (
        <div className={wrapperClass}>
            {text}
        </div>
    );
};
