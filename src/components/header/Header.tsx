import { InfoPanel, InfoPanelList } from "../infoPanel/InfoPanel.tsx";
import styles from './Header.module.css';

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logotype}>
                <div>Check</div>
                <div className={styles.background}>ON</div>
            </div>
            <InfoPanel
                text={'Добавленные в отслеживаемый список товары хранятся на устройстве!'}
                type={InfoPanelList.informationStatic}/>
        </div>
    );
};
